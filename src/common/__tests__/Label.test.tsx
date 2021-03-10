import * as navigation from "@react-navigation/native";
import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import { lightTheme } from "../../theme";
import Label from "../Label";

jest.spyOn(navigation, "useTheme");
navigation.useTheme.mockImplementation(() => lightTheme);

describe("Label", () => {
  it("renders correctly", () => {
    const props = {
      text: "$_LABEL_TEXT_$",
    };
    const tree = TestRenderer(<Label {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with a different color", () => {
    const props = {
      text: "$_LABEL_TEXT_$",
      color: "salmon",
    };
    const tree = TestRenderer(<Label {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
