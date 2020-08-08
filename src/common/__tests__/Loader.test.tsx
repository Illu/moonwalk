import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import Loader from "../Loader";

describe("Loader", () => {
  it("renders correctly", () => {
    const tree = TestRenderer(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
