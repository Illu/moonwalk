import { render } from "@testing-library/react-native";
import React from "react";

import { LightThemeProvider } from "../../helpers/testProviders";
import AppearanceSettings from "../AppearanceSettings";

jest.mock("../../common/ActionMenu", () => "ActionMenu");

it("Displays the AppearanceSettings screen", async () => {
  const { findByTestId } = render(<AppearanceSettings />, {
    wrapper: LightThemeProvider,
  });
  expect(await findByTestId("AppearanceSettings")).toBeTruthy();
});
