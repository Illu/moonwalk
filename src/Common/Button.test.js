import React from "react";
import Button from "./Button";
import renderer from "react-test-renderer";
import { ThemeProvider } from "styled-components";
import theme from "../theme";

const renderWithTheme = component =>
  renderer.create(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
describe("Button", () => {
  it("renders correctly", () => {
    const tree = renderWithTheme(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with title correctly", () => {
    const tree = renderWithTheme(<Button title="Press me" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders with a different type style", () => {
    const tree = renderWithTheme(
      <Button type="secondary" title="Secondary" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
