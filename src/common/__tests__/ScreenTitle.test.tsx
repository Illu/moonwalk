import React from "react";
import { ScreenTitle } from "../";
import {renderWithTheme} from '../../helpers/testHelpers'

describe("ScreenTitle", () => {
  it("renders correctly", () => {
    const tree = renderWithTheme(<ScreenTitle title="SAMPLE_TITLE" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
