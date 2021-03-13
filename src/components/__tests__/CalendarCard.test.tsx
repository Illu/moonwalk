import * as navigation from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import React from "react";

import { LightThemeProvider } from "../../helpers/testProviders";
import { lightTheme } from "../../theme";
import CalendarCard from "../CalendarCard";

jest.spyOn(navigation, "useTheme");
navigation.useTheme.mockImplementation(() => lightTheme);

describe("CalendarCard", () => {
  it("renders correctly with a title", async () => {
    const { findByText } = render(
      <CalendarCard
        data={{
          name: "TEST_NAME",
          launch_service_provider: { name: "TEST_LSP" },
          net: "000000",
          pad: { name: "TEST_PAD" },
        }}
        isFirst
      />,
      {
        wrapper: LightThemeProvider,
      }
    );
    expect(await findByText("JAN")).toBeTruthy();
  });
});
