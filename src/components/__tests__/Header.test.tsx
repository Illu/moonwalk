import * as navigation from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";

import { LightThemeProvider } from "../../helpers/testProviders";
import { lightTheme } from "../../theme";
import Header from "../Header";

jest.spyOn(navigation, "useTheme");
navigation.useTheme.mockImplementation(() => lightTheme);

describe("Header", () => {
  it("renders correctly with a title", async () => {
    const { findByText } = render(<Header title="TITLE" />, {
      wrapper: LightThemeProvider,
    });
    expect(await findByText("TITLE")).toBeTruthy();
  });
});
