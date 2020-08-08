import React, { ReactNode } from "react";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components/native";

import { lightTheme } from "../theme";

const TestRenderer = (children: ReactNode) =>
  renderer.create(
    <ThemeProvider theme={lightTheme.colors}>{children}</ThemeProvider>
  );

export default TestRenderer;
