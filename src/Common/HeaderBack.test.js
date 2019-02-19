import React from "react";
import HeaderBack from "./HeaderBack";
import renderer from "react-test-renderer";

describe("HeaderBack", () => {
  it("renders correctly", () => {
    const props = {
      ScreenTitle: "$screen_title$",
      navigateBack: jest.fn()
    };
    const tree = renderer.create(<HeaderBack {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
