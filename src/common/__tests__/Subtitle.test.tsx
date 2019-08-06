import React from "react";
import { Subtitle } from "../";
import { renderWithTheme } from '../../helpers/testHelpers'

describe("Subtitle", () => {
  it("renders correctly", () => {
    const tree = renderWithTheme(<Subtitle text="SAMPLE_SUBTITLE" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
