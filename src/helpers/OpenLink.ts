import { Linking } from "react-native";
import InAppBrowser from "react-native-inappbrowser-reborn";

import { Browsers } from "../types";

export const openLink = async (
  url: string,
  mode: Browsers = Browsers.inApp
) => {
  try {
    if ((await InAppBrowser.isAvailable()) && mode === Browsers.inApp) {
      await InAppBrowser.open(url, {
        // iOS Properties
        dismissButtonStyle: "done",
        readerMode: false,
        animated: true,
        modalPresentationStyle: "overFullScreen",
        modalTransitionStyle: "coverVertical",
        modalEnabled: true,
        enableBarCollapsing: true,
        // Android Properties
        showTitle: true,
        toolbarColor: "#000",
        secondaryToolbarColor: "black",
        enableUrlBarHiding: true,
        enableDefaultShare: true,
        forceCloseOnRedirection: false,
        // Specify full animation resource identifier(package:anim/name)
        // or only resource name(in case of animation bundled with app).
        animations: {
          startEnter: "slide_in_right",
          startExit: "slide_out_left",
          endEnter: "slide_in_left",
          endExit: "slide_out_right",
        },
      });
    } else Linking.openURL(url);
  } catch (error) {
    console.warn(error.message);
  }
};
