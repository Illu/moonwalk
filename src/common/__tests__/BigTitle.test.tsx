import React from "react";
import BigTitle from "../BigTitle";
import renderer from "react-test-renderer";

describe("BigTitle", () => {
  it("renders correctly", () => {
    const props = {
      title: "$_TITLE_TEXT_$",
    };
    const tree = renderer.create(<BigTitle {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with the See More option", () => {
    const props = {
      title: "$_TITLE_TEXT_$",
      onSeeMore: jest.fn(),
    };
    const tree = renderer.create(<BigTitle {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});