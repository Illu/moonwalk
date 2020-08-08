import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import BigTitle from "../BigTitle";

describe("BigTitle", () => {
  it("renders correctly", () => {
    const props = {
      title: "$_TITLE_TEXT_$",
    };
    const tree = TestRenderer(<BigTitle {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with the See More option", () => {
    const props = {
      title: "$_TITLE_TEXT_$",
      onSeeMore: jest.fn(),
    };
    const tree = TestRenderer(<BigTitle {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
