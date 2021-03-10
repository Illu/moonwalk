import { Theme, DefaultTheme as defaultTheme } from "@react-navigation/native";

export const LightTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    secondary: "#000",
    background: "#f1f2f7",
    text: "#000",
    placeholderText: "#7d7f86",
    inputBackground: "#dee1e7",
    secondaryText: "#666",
    accent: "#0a84ff",
    accentBackground: "rgba(10, 132, 255, 0.1)",
    uiAccent: "#c3c4c6",
  },
};

export const DefaultTheme = LightTheme;

export const DarkTheme: Theme = LightTheme;

export const useTheme = jest.fn().mockReturnValue({
  LightTheme,
});

export const useFocusEffect = jest.fn();
export const useNavigation = jest.fn().mockReturnValue({
  navigate: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  setOptions: jest.fn(),
});
export const useNavigationState = jest.fn();
export const useRoute = jest.fn().mockReturnValue({
  params: {},
});
