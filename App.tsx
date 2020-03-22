import React, { useContext } from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/screens/Dashboard';
import { darkTheme, lightTheme } from './theme';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Details from './src/screens/Details';
import Settings from './src/screens/Settings';
import Tabbar from './src/components/Tabbar';
import Calendar from './src/screens/Calendar';
import News from './src/screens/News';
import Search from './src/screens/Search';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import HeaderSettingsButton from './src/components/HeaderSettingsButton';
import NotificationsSettings from './src/screens/NotificationsSettings';
import AppearanceSettings from './src/screens/AppearanceSettings';
import AppState from './src/stores/AppState';
import { Themes } from './src/types';
import { observer } from 'mobx-react';

enableScreens();

const Tab = createBottomTabNavigator();
const HomeNav = createNativeStackNavigator();
const CalendarNav = createNativeStackNavigator();
const NewsNav = createNativeStackNavigator();
const SearchNav = createNativeStackNavigator();

const HomeStack = () => (
  <HomeNav.Navigator >
    <HomeNav.Screen options={{
      headerTranslucent: true,
      headerHideShadow: true,
      headerStyle: { backgroundColor: '#f1f2f7' },
      headerRight: HeaderSettingsButton,
    }}
    name="Dashboard" component={Dashboard} />
    <HomeNav.Screen name="Details" component={Details} />
    <HomeNav.Screen name="Settings" component={Settings} />
    <HomeNav.Screen name="Notifications" component={NotificationsSettings} />
    <HomeNav.Screen name="Appearance" component={AppearanceSettings} />
  </HomeNav.Navigator>
)

const CalendarStack = () => (
  <CalendarNav.Navigator>
    <CalendarNav.Screen options={{
      headerLargeTitle: true,
      headerHideShadow: true,
      headerStyle: { backgroundColor: '#f1f2f7' },
    }} name="Calendar" component={Calendar} />
    <CalendarNav.Screen name="Details" component={Details} />
  </CalendarNav.Navigator>
)

const NewsStack = () => (
  <NewsNav.Navigator>
    <NewsNav.Screen options={{
      headerLargeTitle: true,
      headerHideShadow: true,
      headerStyle: { backgroundColor: '#f1f2f7' },
    }} name="News" component={News} />
  </NewsNav.Navigator>
)

const SearchStack = () => (
  <SearchNav.Navigator>
    <SearchNav.Screen options={{
      headerLargeTitle: true,
      headerHideShadow: true,
      headerStyle: { backgroundColor: '#f1f2f7' },
    }} name="Search" component={Search} />
    <SearchNav.Screen name="Details" component={Details} />
  </SearchNav.Navigator>
)

const App = observer(() => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);
  
  let theme;
  if (appStateStore.theme === Themes.automatic) {
    theme = scheme === 'dark' ? darkTheme : lightTheme
  } else if (appStateStore.theme === Themes.light) {
    theme = lightTheme;
  } else if (appStateStore.theme === Themes.dark) {
    theme = darkTheme;
  }

  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme.colors}>
        <NavigationContainer theme={theme}>
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
