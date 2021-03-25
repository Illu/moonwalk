import { Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

import { Browsers } from "../../types";
import { openLink } from "../OpenLink";

const inAppBrowserSpy = jest.spyOn(InAppBrowser, "open");
const isAvailableSpy = jest.spyOn(InAppBrowser, "isAvailable");
const openURLSpy = jest.spyOn(Linking, "openURL");

isAvailableSpy.mockImplementation(() => Promise.resolve(true));
inAppBrowserSpy.mockImplementation(jest.fn());

describe("OpenLink", () => {
  it("Opens the link using the in-app browser", async () => {
    const externalURL = "https://maximenory.com";
    await openLink(externalURL, Browsers.inApp);
    expect(inAppBrowserSpy).toHaveBeenCalledWith(
      externalURL,
      expect.any(Object)
    );
  });

  it("Opens the link using an external browser if the in-app browser isn't available", async () => {
    const externalURL = "https://maximenory.com";
    isAvailableSpy.mockImplementationOnce(() => Promise.resolve(false));
    await openLink(externalURL, Browsers.inApp);
    expect(openURLSpy).toHaveBeenCalledWith(externalURL);
  });

  it("Opens the link using an external browser", async () => {
    const externalURL = "https://maximenory.com";
    await openLink(externalURL, Browsers.safari);
    expect(openURLSpy).toHaveBeenCalledWith(externalURL);
  });
});
