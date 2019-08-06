import React from "react";
import { NextLaunchCard } from "../";
import { renderWithTheme } from '../../helpers/testHelpers'

describe("NextLaunchCard", () => {
  it("renders correctly with an image", () => {
    const tree = renderWithTheme(<NextLaunchCard imgUrl="https://example.com/img.jpg" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly without an image", () => {
    const tree = renderWithTheme(<NextLaunchCard />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
