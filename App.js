import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {StatusBar} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { ThemeProvider } from 'styled-components';
import {createBottomTabNavigator} from 'react-navigation';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import DashboardScreen from './src/Components/DashboardScreen';
import theme from './src/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TABS, TABBAR_ICONS } from './src/constants';
import rootReducer from './src/Ducks/rootReducer';

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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  ),
);


export default () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </>
    </ThemeProvider>
  </Provider>
)