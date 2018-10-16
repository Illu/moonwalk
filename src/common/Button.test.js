import React from "react";
import Button from "./Button";
import renderer from "react-test-renderer";

it("renders correctly", () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with title correctly", () => {
  const tree = renderer.create(<Button title="Press me" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with a different type style", () => {
  const tree = renderer
    .create(<Button type="secondary" title="Secondary" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
