import React, { ReactChild } from "react";
import { ThemeProvider } from "styled-components/native";

import { lightTheme, darkTheme } from "../theme";

interface Props {
  children: ReactChild;
}

export const DarkThemeProvider = ({ children }: Props) => (
  <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);

export const LightThemeProvider = ({ children }: Props) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);
