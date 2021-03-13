import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import Preview from "../Preview";

describe("Preview", () => {
  it("renders correctly", () => {
    const tree = TestRenderer(
      <Preview
        data={{ image: "IMAGE_URL", name: "NAME", net: "000000" }}
        onPress={jest.fn}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
