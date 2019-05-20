import React, { Component } from "react";
import { StatusBar, AppState } from "react-native";
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
import NewsModel from "./src/Models/NewsModel";
import LibrariesScreen from "./src/Components/LibrariesScreen/LibrariesScreen";
import { configureRNPushNotifications } from "./src/helpers";
import NewsScreen from "./src/Components/NewsScreen/NewsScreen";

configureRNPushNotifications();

const Dashboard = createStackNavigator({
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: "Next launch",
      header: null
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

const News = createStackNavigator({
  news: {
    screen: NewsScreen,
    navigationOptions: {
      title: "News",
      header: null,
      headerBackTitle: null
    }
  }
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

const Settings = createStackNavigator({
  search: {
    screen: SettingsScreen,
    navigationOptions: {
      title: "Settings",
      header: null,
      headerBackTitle: null
    }
  },
  libraries: { screen: LibrariesScreen }
});

const Navigation = createBottomTabNavigator(
  {
    [TABS.Home]: Dashboard,
    [TABS.Calendar]: LaunchCalendar,
    [TABS.News]: News,
    [TABS.Search]: Search,
    [TABS.Settings]: Settings
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
      activeTintColor: "blue",
      inactiveTintColor: theme.inactive,
      showLabel: true,
      style: {
        backgroundColor: "white"
      }
    }
  }
);

const launches = new LaunchesModel();
const search = new SearchModel();
const news = new NewsModel();

export default class extends Component {
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (launches.numberOfLaunches > 0) {
        launches.scheduleNotification(launches.launches[0]);
      }
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <Provider launches={launches} search={search} news={news}>
        <ThemeProvider theme={theme}>
          <>
            <StatusBar barStyle="light-content" />
            <Navigation />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}
