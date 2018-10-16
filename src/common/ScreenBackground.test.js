import React from "react";
import ScreenBackground from "./ScreenBackground";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<ScreenBackground />).toJSON();
  expect(tree).toMatchSnapshot();
});
