import { render } from "@testing-library/react-native";
import React from "react";

import Dashboard from "../Dashboard";

jest.mock("../../common/HeaderTitleLogo", () => "HeaderTitleLogo");
jest.mock("../../hooks/useAppState", () => jest.fn())

jest.mock("@react-navigation/native", () => {
  return {
    ...jest.requireActual("@react-navigation/native"),
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

fetch = jest.fn(() => Promise.resolve());

it("Displays the dashboard", async () => {
  const { findByTestId } = render(<Dashboard />);
  expect(await findByTestId("dashboard")).toBeTruthy();
});
