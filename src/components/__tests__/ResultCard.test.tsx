import React from "react";
import ResultCard from "../ResultCard";
import renderer from "react-test-renderer";

describe("ResultCard", () => {
  it("renders correctly", () => {
    const props = {
      data: {
        name: "$_TEST_NAME_$",
        net: "$_TEST_NET_DATE_$"
      },
      showDetails: jest.fn()
    };
    const tree = renderer.create(<ResultCard {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
