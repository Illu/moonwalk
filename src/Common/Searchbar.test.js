import React from "react";
import Searchbar from "./Searchbar";
import renderer from "react-test-renderer";

describe("Searchbar", () => {
  it("renders correctly", () => {
    const props = {
      launchSearch: jest.fn()
    };
    const tree = renderer.create(<Searchbar {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
