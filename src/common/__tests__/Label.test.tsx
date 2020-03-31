import React from "react";
import Label from "../Label";
import renderer from "react-test-renderer";

describe("Label", () => {
  it("renders correctly", () => {
    const props = {
      text: "$_LABEL_TEXT_$",
    };
    const tree = renderer.create(<Label {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with a different color", () => {
    const props = {
      text: "$_LABEL_TEXT_$",
      color: "salmon"
    };
    const tree = renderer.create(<Label {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});