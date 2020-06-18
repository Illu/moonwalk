import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { StatusBar } from "react-native";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { ThemeProvider } from "styled-components/native";

import HeaderSettingsButton from "./src/components/HeaderSettingsButton";
import Tabbar from "./src/components/Tabbar";
import AppearanceSettings from "./src/screens/AppearanceSettings";
import Calendar from "./src/screens/Calendar";
import Dashboard from "./src/screens/Dashboard";
import { darkTheme, lightTheme } from "./src/theme";
import Details from "./src/screens/Details";
import Settings from "./src/screens/Settings";
import News from "./src/screens/News";
import Search from "./src/screens/Search";
import NotificationsSettings from "./src/screens/NotificationsSettings";
import Licenses from "./src/screens/Licenses";
import AppState from "./src/stores/AppState";
import { Themes } from "./src/types";
import AppIconSettings from "./src/screens/AppIconSettings";

enableScreens();

const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const CalendarNav = createNativeStackNavigator();
const NewsNav = createNativeStackNavigator();
const SearchNav = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <HomeNav.Navigator>
      <HomeNav.Screen
        options={{
          headerTranslucent: false,
          headerHideShadow: true,
          headerTitle: "",
          headerStyle: { backgroundColor: "transparent" },
          headerRight: HeaderSettingsButton,
        }}
        name="Home"
        component={Dashboard}
      />
      <HomeNav.Screen name="Details" component={Details} />
      <HomeNav.Screen
        name="Settings"
        component={Settings}
        options={{ headerBackTitle: "Home" }}
      />
      <HomeNav.Screen name="Notifications" component={NotificationsSettings} />
      <HomeNav.Screen name="Appearance" component={AppearanceSettings} />
      <HomeNav.Screen name="Icon" component={AppIconSettings} />
      <HomeNav.Screen
        name="Licenses"
        options={{
          headerLargeTitle: true,
          headerHideShadow: true,
        }}
        component={Licenses}
      />
    </HomeNav.Navigator>
  );
};

const CalendarStack = () => {
  const { colors } = useTheme();
  return (
    <CalendarNav.Navigator>
      <CalendarNav.Screen
        options={{
          headerLargeTitle: true,
          headerHideShadow: true,
          headerStyle: { backgroundColor: colors.background },
        }}
        name="Calendar"
        component={Calendar}
      />
      <CalendarNav.Screen name="Details" component={Details} />
    </CalendarNav.Navigator>
  );
};
const NewsStack = () => {
  const { colors } = useTheme();
  return (
    <NewsNav.Navigator>
      <NewsNav.Screen
        options={{
          headerLargeTitle: true,
          headerHideShadow: true,
          headerStyle: { backgroundColor: colors.background },
        }}
        name="News"
        component={News}
      />
    </NewsNav.Navigator>
  );
};

const SearchStack = () => {
  const { colors } = useTheme();
  return (
    <SearchNav.Navigator>
      <SearchNav.Screen
        options={{
          headerLargeTitle: true,
          headerHideShadow: true,
          headerStyle: { backgroundColor: colors.background },
        }}
        name="Search"
        component={Search}
      />
      <SearchNav.Screen name="Details" component={Details} />
    </SearchNav.Navigator>
  );
};

const App = observer(() => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);

  let theme;
  let statusBarStyle;
  if (appStateStore.theme === Themes.automatic) {
    if (scheme === "dark") {
      theme = darkTheme;
      statusBarStyle = "light-content";
    } else {
      theme = lightTheme;
      statusBarStyle = "dark-content";
    }
  } else if (appStateStore.theme === Themes.light) {
    theme = lightTheme;
    statusBarStyle = "dark-content";
  } else if (appStateStore.theme === Themes.dark) {
    theme = darkTheme;
    statusBarStyle = "light-content";
  }

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme.colors}>
        <NavigationContainer theme={theme}>
          <StatusBar barStyle={statusBarStyle} />
          <Tab.Navigator tabBar={Tabbar}>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Calendar" component={CalendarStack} />
            <Tab.Screen name="News" component={NewsStack} />
            <Tab.Screen name="Search" component={SearchStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
});

export default App;
