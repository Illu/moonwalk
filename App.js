import React from 'react';
import {StatusBar} from 'react-native';
import styled, { ThemeProvider } from 'styled-components';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import DashboardScreen from './src/Dashboard/DashboardScreen';
import theme from './src/theme';


const Navigation = FluidNavigator({
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
      header: null,
    }
  },
});

export default () => (
  <ThemeProvider theme={theme}>
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </>
  </ThemeProvider>
)