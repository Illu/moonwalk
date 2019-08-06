import React, { ReactElement } from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components/native";

import theme from "../theme";

export const renderWithTheme = (component: ReactElement) =>
  renderer.create(<ThemeProvider theme={theme}>{component}</ThemeProvider>);