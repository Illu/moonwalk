import React from "react";
import PushableWrapper from "./PushableWrapper";
import renderer from "react-test-renderer";

jest.useFakeTimers();

describe("PushableWrapper", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<PushableWrapper />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
