import {
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondary: '#ddd',
    background: 'rgb(241, 256, 254)',
    placeholderText: '#666',
    secondaryText: '#666',
    accent: 'rgb(254, 202, 82)',
    accentBackground: 'rgb(45, 42, 83)',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#eeeeee',
    background: '#2d2d2d',
    placeholderText: '#666',
    secondaryText: '#999',
    secondary: '#333',
    accent: 'rgb(254, 202, 82)',
    accentBackground: 'rgb(45, 42, 83)',
  },
};