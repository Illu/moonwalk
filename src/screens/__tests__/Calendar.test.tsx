import * as navigation from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";

import { LightThemeProvider } from "../../helpers/testProviders";
import { lightTheme } from "../../theme";
import Calendar from "../Calendar";

jest.spyOn(navigation, "useTheme");
navigation.useTheme.mockImplementation(() => lightTheme);

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.reject(),
  })
);

it("Displays the Calendar screen", async () => {
  const { findByTestId } = render(<Calendar />, {
    wrapper: LightThemeProvider,
  });
  expect(await findByTestId("Calendar")).toBeTruthy();
});
