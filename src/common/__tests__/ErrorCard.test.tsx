import React from "react";
import ErrorCard from "../ErrorCard";
import renderer from "react-test-renderer";

jest.mock('../../common/Icon', () => 'Icon');

describe("ErrorCard", () => {
  it("renders correctly with a default message", () => {
    const props = {
      onRetry: jest.fn(),
    };
    const tree = renderer.create(<ErrorCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("renders correctly with a custom message", () => {
    const props = {
      message: "$_MESSAGE_TEXT_$",
      onRetry: jest.fn(),
    };
    const tree = renderer.create(<ErrorCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});