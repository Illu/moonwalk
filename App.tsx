import React, {useContext} from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './src/screens/Dashboard';
import { darkTheme, lightTheme } from './theme';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Details from './src/screens/Details';
import Settings from './src/screens/Settings';
import Tabbar from './src/components/Tabbar';
import Calendar from './src/screens/Calendar';
import News from './src/screens/News';

const Main = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator tabBar={Tabbar}>
    <Tab.Screen name="Home" component={Dashboard} />
    <Tab.Screen name="Calendar" component={Calendar} />
    <Tab.Screen name="News" component={News} />
    <Tab.Screen name="Search" component={Dashboard} />
  </Tab.Navigator>
)

const App = () => {
  const scheme = useColorScheme();

  const theme = scheme === 'dark' ? darkTheme : lightTheme
  
  return (
    <AppearanceProvider>
      <ThemeProvider theme={theme.colors}>
        <NavigationContainer theme={theme}>
          <Main.Navigator headerMode="none" mode="modal">
            <Main.Screen name="Root" component={TabNavigator} />
            <Main.Screen name="Details" component={Details} />
            <Main.Screen name="Settings" component={Settings} />
          </Main.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
