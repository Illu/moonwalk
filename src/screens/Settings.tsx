import { useNavigation, useTheme } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { ScrollView, View, Linking } from "react-native";
import analytics from '@react-native-firebase/analytics';
import * as StoreReview from "react-native-store-review";
import styled from "styled-components/native";

import Package from "../../package.json";
import ActionMenu from "../common/ActionMenu";
import SelectionModal from "../common/SelectionModal";
import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";
import Launches from "../stores/Launches";
import { Themes, Browsers } from "../types";

const BottomText = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const Settings = observer(() => {

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const launchesStore = useContext(Launches);
  const appStateStore = useContext(AppState);
  const items = [
    [
      {
        title: "Push Notifications",
        preview: !launchesStore.notifications.enabled
          ? "None"
          : `${launchesStore.notifications.delay} minutes`,
        icon: "ChevronRight",
        action: () => navigation.navigate("Notifications"),
      },
      {
        title: "Appearance",
        icon: "ChevronRight",
        preview:
          appStateStore.theme === Themes.automatic
            ? "Automatic"
            : appStateStore.theme === Themes.light
              ? "Light"
              : "Dark",
        action: () => navigation.navigate("Appearance"),
      },
      {
        title: "App Icon",
        icon: "ChevronRight",
        action: () => navigation.navigate("Icon"),
        preview: appStateStore.appIcon,
      },
      {
        title: "Open Links in",
        icon: "ChevronRight",
        action: () => setModalVisible(true),
        preview:
          appStateStore.browser === Browsers.safari
            ? "Safari"
            : "In-App Safari",
      },
    ],
    [
      {
        title: "Rate the App",
        icon: "Star",
        action: () => {
          if (StoreReview.isAvailable) {
            analytics().logEvent("OPEN_REVIEW", { mode: "in-app" });
            StoreReview.requestReview();
          } else {
            analytics().logEvent("OPEN_REVIEW", { mode: "link" });
            Linking.openURL(
              "https://itunes.apple.com/us/app/moonwalk-rocket-launches/id1439376174"
            );
          }
        },
      },
      {
        title: "Say hi 👋",
        icon: "Twitter",
        action: () => {
          analytics().logEvent("OPEN_TWITTER", {});
          Linking.openURL("https://twitter.com/MaximeNory");
        },
      },
      {
        title: "Report an issue",
        icon: "ChevronRight",
        action: () => {
          analytics().logEvent("OPEN_ISSUE", {});
          openLink(
            "https://github.com/Illu/moonwalk/issues/new/choose",
            appStateStore.browser
          );
        },
      },
    ],
    [
      {
        title: "Licenses",
        icon: "ChevronRight",
        action: () => navigation.navigate("Licenses"),
      },
      {
        title: "Source code",
        icon: "Github",
        action: () => {
          analytics().logEvent("OPEN_SOURCECODE", {});
          openLink("https://github.com/Illu/moonwalk", appStateStore.browser);
        },
      },
      {
        title: "About",
        icon: "ChevronRight",
        action: () => {
          analytics().logEvent("OPEN_TOS", {});
          openLink("https://maximenory.com/moonwalk/", appStateStore.browser);
        },
        preview: `v${Package.version}`,
      },
    ],
  ];

  const modalActions = [
    {
      icon: "Compass",
      title: "In-App Browser",
      action: () => {
        appStateStore.setBrowser(Browsers.inApp);
      },
      id: Browsers.inApp,
    },
    {
      icon: "Compass",
      title: "Safari",
      action: () => {
        appStateStore.setBrowser(Browsers.safari);
      },
      id: Browsers.safari,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {modalVisible && (
        <SelectionModal
          closeModal={() => {
            setModalVisible(false);
          }}
          title="Open Links in..."
          actions={modalActions}
          selected={appStateStore.browser}
        />
      )}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ActionMenu items={items} />
        <BottomText>2021 - Maxime Nory</BottomText>
      </ScrollView>
    </View>
  );
});

export default Settings;
