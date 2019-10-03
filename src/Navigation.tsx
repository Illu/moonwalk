import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createAppContainer } from 'react-navigation';
import { createFluidNavigator } from 'react-navigation-fluid-transitions';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { TABBAR_ICONS, TABS } from './constants';
import { Calendar, Dashboard, News } from './screens';
import Details from './screens/Details';

const generateNavigation = (theme: any) => {
  const DashboardNavigator = createFluidNavigator({
    dashboard: {
      screen: Dashboard,
      navigationOptions: {
        title: "Dashboard",
        header: null,
        headerBackTitle: null,
        theme: 'dark'
      }
    },
    details: { screen: Details }
  });
  
  const CalendarNavigator = createStackNavigator({
    dashboard: {
      screen: Calendar,
      navigationOptions: {
        title: "Dashboard",
        header: null,
        headerBackTitle: null
      }
    },
    details: { screen: Details }
  });
  
  const NewsNavigator = createStackNavigator({
    dashboard: {
      screen: News,
      navigationOptions: {
        title: "News",
        header: null,
        headerBackTitle: null
      }
    }
  });

  const Navigator = createBottomTabNavigator(
    {
      [TABS.Home]: DashboardNavigator,
      [TABS.Calendar]: CalendarNavigator,
      [TABS.News]: NewsNavigator,
      [TABS.Search]: DashboardNavigator,
      // [TABS.Settings]: DashboardNavigator
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          const iconName = TABBAR_ICONS[routeName];
          return <Icon name={iconName} size={20} color={tintColor} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: theme.secondary,
        inactiveTintColor: theme.inactive,
        showLabel: false,
        style: {
          backgroundColor: theme.primary,
          borderTopColor: "transparent"
        }
      }
    }
  );

  return createAppContainer(Navigator);
}

export default generateNavigation;
