import React from "react";
import Pushable from "../Pushable";
import TestRenderer from "../../helpers/testRenderer";

describe("Pushable", () => {
  it("renders correctly", () => {
    const tree = TestRenderer(<Pushable onPress={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
