import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import HeaderSettingsButton from "../HeaderSettingsButton";

describe("HeaderSettingsButton", () => {
  xit("renders correctly", () => {
    const tree = TestRenderer(<HeaderSettingsButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
