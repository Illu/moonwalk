import React from "react";
import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components";
import { createBottomTabNavigator } from "react-navigation";
import { Provider } from "mobx-react";
import DashboardScreen from "./src/Components/DashboardScreen";
import theme from "./src/theme";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TABS, TABBAR_ICONS } from "./src/constants";
import LaunchCalendarScreen from "./src/Components/LaunchCalendarScreen";
import LaunchDetailsScreen from "./src/Components/LaunchDetailsScreen";
import { createStackNavigator } from "react-navigation";
import SearchScreen from "./src/Components/SearchScreen";
import SettingsScreen from "./src/Components/SettingsScreen";
import LaunchesModel from "./src/Models/LaunchesModel";
import SearchModel from "./src/Models/SearchModel";

const Dashboard = createStackNavigator({
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: "Dashboard",
      header: null,
      headerBackTitle: null
    }
  },
  details: { screen: LaunchDetailsScreen }
});

const LaunchCalendar = createStackNavigator({
  launchCalendar: {
    screen: LaunchCalendarScreen,
    navigationOptions: {
      title: "Launch calendar",
      header: null,
      headerBackTitle: null
    }
  },
  details: { screen: LaunchDetailsScreen }
});

const Search = createStackNavigator({
  search: {
    screen: SearchScreen,
    navigationOptions: {
      title: "Search",
      header: null,
      headerBackTitle: null
    }
  },
  details: { screen: LaunchDetailsScreen }
});

const Navigation = createBottomTabNavigator(
  {
    [TABS.Home]: Dashboard,
    [TABS.Calendar]: LaunchCalendar,
    [TABS.Search]: Search,
    [TABS.Settings]: SettingsScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = TABBAR_ICONS[routeName];
        return <Icon name={iconName} size={20} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: theme.inactive,
      showLabel: true,
      style: {
        backgroundColor: theme.cardBackground
      }
    }
  }
);

const launches = new LaunchesModel();
const search = new SearchModel();

export default () => (
  <Provider launches={launches} search={search}>
    <ThemeProvider theme={theme}>
      <>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </>
    </ThemeProvider>
  </Provider>
);

// Access the launches data easily
window.launches = launches;
window.search = search;
