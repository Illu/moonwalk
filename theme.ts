import {
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondary: '#fff',
    background: '#f1f2f7',
    placeholderText: '#7d7f86',
    inputBackground: '#dee1e7',
    secondaryText: '#666',
    accent: '#0a84ff',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#c3c4c6',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#fff',
    background: '#000',
    placeholderText: '#666',
    inputBackground: '#1e2022',
    secondaryText: '#999',
    secondary: '#1a1d1e',
    accent: '#0a84ff',
    accentBackground: 'rgba(10, 132, 255, 0.1)',
    uiAccent: '#68707e',
  },
};

// accent: '#feca52',