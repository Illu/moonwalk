import { render } from "@testing-library/react-native";
import React from "react";

import { LightThemeProvider } from "../../helpers/testProviders";
import AppIconSettings from "../AppIconSettings";

jest.mock("../../common/ActionMenu", () => "ActionMenu");

it("Displays the AppIconSettings screen", async () => {
  const { findByTestId } = render(<AppIconSettings />, {
    wrapper: LightThemeProvider,
  });
  expect(await findByTestId("AppIconSettings")).toBeTruthy();
});
