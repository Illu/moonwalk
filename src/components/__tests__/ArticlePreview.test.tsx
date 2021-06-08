import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import ArticlePreview from "../ArticlePreview";

jest.mock("../../helpers/OpenLink", () => ({openLink: jest.fn()}))

describe("ArticlePreview", () => {
  it("renders correctly", () => {
    const tree = TestRenderer(
      <ArticlePreview article={{}} timePosted={0} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly at the top of the list", () => {
    const tree = TestRenderer(
      <ArticlePreview article={{}} timePosted={0} isFirst={true} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
