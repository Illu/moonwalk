import { observer } from "mobx-react";
import React, { useContext } from "react";
import { ScrollView } from "react-native";
import firebase from "react-native-firebase";

import ActionMenu from "../common/ActionMenu";
import AppState from "../stores/AppState";
import { Themes } from "../types";

const AppearanceSettings = observer(() => {
  const appStateStore = useContext(AppState);

  const switchTheme = (newTheme: Themes) => {
    appStateStore.setTheme(newTheme);
    firebase.analytics().logEvent("SWITCH_THEME", { value: newTheme });
  };

  const items = [
    [
      {
        title: "Automatic",
        icon:
          appStateStore.theme === Themes.automatic ? "CheckCircle" : "Circle",
        action: () => switchTheme(Themes.automatic),
      },
      {
        title: "Light",
        icon: appStateStore.theme === Themes.light ? "CheckCircle" : "Circle",
        action: () => switchTheme(Themes.light),
      },
      {
        title: "Dark",
        icon: appStateStore.theme === Themes.dark ? "CheckCircle" : "Circle",
        action: () => switchTheme(Themes.dark),
      },
    ],
  ];

  return (
    <ScrollView testID="AppearanceSettings">
      <ActionMenu items={items} />
    </ScrollView>
  );
});

export default AppearanceSettings;
