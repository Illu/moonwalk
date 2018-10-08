import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {StatusBar} from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { ThemeProvider } from 'styled-components';
import {createBottomTabNavigator} from 'react-navigation';
import DashboardScreen from './src/Components/DashboardScreen';
import theme from './src/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TABS, TABBAR_ICONS } from './src/constants';
import rootReducer from './src/Ducks/rootReducer';
import LaunchCalendarScreen from './src/Components/LaunchCalendarScreen';
import LaunchDetailsScreen from './src/Components/LaunchDetailsScreen';
import {createStackNavigator} from 'react-navigation'
import SearchScreen from './src/Components/SearchScreen';

const Dashboard = createStackNavigator({
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
      header: null,
      headerBackTitle: null,
    }
  },
  details: { screen: LaunchDetailsScreen },
});

const LaunchCalendar = createStackNavigator({
  launchCalendar: {
    screen: LaunchCalendarScreen,
    navigationOptions: {
      title: 'Launch calendar',
      header: null,
      headerBackTitle: null,
    },
  },
  details: { screen: LaunchDetailsScreen },
});

const Navigation = createBottomTabNavigator({
  [TABS.Home]: Dashboard,
  [TABS.Calendar]: LaunchCalendar,
  [TABS.Search]: SearchScreen,
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      const iconName = TABBAR_ICONS[routeName];
      return <Icon name={iconName} size={22} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: theme.inactive,
    showLabel: true,
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