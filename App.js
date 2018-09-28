import React from 'react';
import {StatusBar} from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import {createBottomTabNavigator} from 'react-navigation';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import DashboardScreen from './src/Dashboard/DashboardScreen';
import theme from './src/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TABS, TABBAR_ICONS } from './src/constants';

const Dashboard = FluidNavigator({
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
      header: null,
    }
  },
});

const Navigation = createBottomTabNavigator({
  [TABS.Home]: Dashboard,
  [TABS.Calendar]: Dashboard,
  [TABS.Profile]: Dashboard,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      const iconName = TABBAR_ICONS[routeName];
      return <Icon name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: theme.inactive,
    showLabel: false,
    style: {
      backgroundColor: theme.cardBackground,
    }
  },
}
);

export default () => (
  <ThemeProvider theme={theme}>
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </>
  </ThemeProvider>
)