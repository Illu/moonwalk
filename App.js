import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import ListScreen from './src/ListScreen';
import {FluidNavigator} from 'react-navigation-fluid-transitions';
import DetailsScreen from './src/DetailsScreen/DetailsScreen';
import theme from './src/theme';

const AppWrapper = styled.View`
  background: ${theme.background};
  flex: 1;
`;

const Navigation = FluidNavigator({
  home: {
    screen: ListScreen,
    navigationOptions: {
      title: 'Home',
      header: null,
    }
  },
  details: {
    screen: DetailsScreen,
    navigationOptions: {
      title: 'Details',
      header: null,
      mode: 'card',
    }
  },
});

export default () => (
  <ThemeProvider theme={theme}>
    <AppWrapper>
      <Navigation />
    </AppWrapper>
  </ThemeProvider>
)