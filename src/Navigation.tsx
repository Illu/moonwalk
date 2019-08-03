import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import { TABS, TABBAR_ICONS } from "./constants";
import { Dashboard } from "./screens";
import theme from "./theme";

const DashboardNavigator = createStackNavigator({
  dashboard: {
    screen: Dashboard,
    navigationOptions: {
      title: "Dashboard",
      header: null,
      headerBackTitle: null
    }
  }
  // details: { screen: LaunchDetailsScreen }
});

const Navigator = createBottomTabNavigator(
  {
    [TABS.Home]: DashboardNavigator,
    [TABS.Calendar]: DashboardNavigator,
    [TABS.News]: DashboardNavigator,
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

const AppContainer = createAppContainer(Navigator);

export default AppContainer;
