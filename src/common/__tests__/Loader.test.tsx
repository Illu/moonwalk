import React from "react";
import Loader from "../Loader";
import TestRenderer from "../../helpers/testRenderer";

describe("Loader", () => {
  it("renders correctly", () => {
    const tree = TestRenderer(<Loader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
