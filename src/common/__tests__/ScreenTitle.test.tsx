import React, { ReactElement } from "react";
import { ScreenTitle } from "../";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components/native";
import theme from "../../theme";

const renderWithTheme = (component: ReactElement) =>
  renderer.create(<ThemeProvider theme={theme}>{component}</ThemeProvider>);

describe("ScreenTitle", () => {
  it("renders correctly", () => {
    const tree = renderWithTheme(<ScreenTitle title="SAMPLE_TITLE" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
