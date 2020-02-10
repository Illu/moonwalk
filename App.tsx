import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './src/screens/Dashboard';
import { darkTheme, lightTheme } from './theme';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import Details from './src/screens/Details';

const Stack = createStackNavigator();

const App = () => {
  const scheme = useColorScheme();

  return (
    <AppearanceProvider>
      <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};

export default App;
