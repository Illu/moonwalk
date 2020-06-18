import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import Label from "../Label";

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
