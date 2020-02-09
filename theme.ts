import {
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondary: '#ddd',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#eeeeee',
    background: '#2d2d2d',
    placeholderText: '#666',
    secondary: '#333',
  },
};