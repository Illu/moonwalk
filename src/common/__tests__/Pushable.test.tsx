import React from "react";
import Pushable from "../Pushable";
import renderer from "react-test-renderer";

describe("Pushable", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Pushable onPress={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
