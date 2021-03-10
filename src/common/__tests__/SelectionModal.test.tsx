import * as navigation from "@react-navigation/native";
import React from "react";

import TestRenderer from "../../helpers/testRenderer";
import { lightTheme } from "../../theme";
import { Browsers } from "../../types";
import SelectionModal from "../SelectionModal";

jest.mock("../../common/Icon", () => "Icon");
jest.useFakeTimers();

jest.spyOn(navigation, "useTheme");
navigation.useTheme.mockImplementation(() => lightTheme);

describe("SelectionModal", () => {
  it("renders correctly", () => {
    const props = {
      closeModal: jest.fn(),
      title: "$_TITLE_TEXT_$",
      actions: [
        {
          title: "$_TITLE_TEXT_$",
          icon: "$_ICON_NAME_$",
          action: jest.fn(),
          id: Browsers.safari,
        },
      ],
      selected: Browsers.safari,
    };
    const tree = TestRenderer(<SelectionModal {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
