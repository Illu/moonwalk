import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import Pushable from "../Pushable";

describe("Pushable", () => {
  it("renders correctly", () => {
    const tree = TestRenderer(<Pushable onPress={jest.fn()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
