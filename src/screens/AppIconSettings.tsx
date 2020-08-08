import { observer } from "mobx-react";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import { changeIcon } from "react-native-change-icon";
import firebase from "react-native-firebase";

import LogoBlackImage from "../../ios/logo_black.png";
import LogoDarkblueImage from "../../ios/logo_darkblue.png";
import LogoLightblueImage from "../../ios/logo_lightblue.png";
import LogoMilkywayImage from "../../ios/logo_milkyway.png";
import LogoWhiteImage from "../../ios/logo_white.png";
import ActionMenu from "../common/ActionMenu";
import AppState from "../stores/AppState";
import { Themes } from "../types";

const AppIconSettings = observer(() => {
  const appStateStore = useContext(AppState);

  const switchIcon = (newIconRef: string, newIconName: string) => {
    changeIcon(newIconRef).then((success) => {
      if (success) {
        appStateStore.setAppIcon(newIconName);
      }
    });
    firebase.analytics().logEvent("SWITCH_ICON", { value: newIconName });
  };

  const items = [
    [
      {
        title: "Default",
        icon: appStateStore.appIcon === "Default" ? "CheckCircle" : "Circle",
        thumbImage: LogoWhiteImage,
        action: () => switchIcon("logo_white", "Default"),
      },
      {
        title: "Deep Space",
        icon: appStateStore.appIcon === "Deep Space" ? "CheckCircle" : "Circle",
        thumbImage: LogoBlackImage,
        action: () => switchIcon("logo_black", "Deep Space"),
      },
      {
        title: "Supernova",
        icon: appStateStore.appIcon === "Supernova" ? "CheckCircle" : "Circle",
        thumbImage: LogoDarkblueImage,
        action: () => switchIcon("logo_darkblue", "Supernova"),
      },
      {
        title: "Oxygen",
        icon: appStateStore.appIcon === "Oxygen" ? "CheckCircle" : "Circle",
        thumbImage: LogoLightblueImage,
        action: () => switchIcon("logo_lightblue", "Oxygen"),
      },
      {
        title: "Milky Way",
        icon: appStateStore.appIcon === "Milky Way" ? "CheckCircle" : "Circle",
        thumbImage: LogoMilkywayImage,
        action: () => switchIcon("logo_milkyway", "Milky Way"),
      },
    ],
  ];

  return (
    <ScrollView>
      <ActionMenu items={items} />
    </ScrollView>
  );
});

export default AppIconSettings;
