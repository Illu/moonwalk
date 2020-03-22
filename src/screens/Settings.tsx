import React, {useContext} from 'react';
import { ScrollView, View, Linking } from 'react-native';
import ActionMenu from '../common/ActionMenu';
import { useNavigation, useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react';
import Launches from '../stores/Launches';
import AppState from '../stores/AppState';
import { Themes } from '../types';
import * as StoreReview from "react-native-store-review";
import styled from 'styled-components/native';
import Package from '../../package.json';

const BottomText = styled.Text`
  text-align: center;
  margin-bottom: 10px;
`;

const Settings = observer(() => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  const launchesStore = useContext(Launches);
  const appStateStore = useContext(AppState);
  const items = [
    [
      {
        title: 'Push Notifications',
        preview: !launchesStore.notifications.enabled ? 'None' : `${launchesStore.notifications.delay} minutes`,
        icon: 'ChevronRight',
        action: () => navigation.navigate("Notifications")
      },
      {
        title: 'Appearance',
        icon: 'ChevronRight',
        preview: appStateStore.theme === Themes.automatic ? "Automatic" : appStateStore.theme === Themes.light ? "Light" : "Dark",
        action: () => navigation.navigate("Appearance")
      },
      {
        title: 'App Icon',
        icon: 'ChevronRight',
      },
    ],
    [
      {
        title: 'Rate the App',
        icon: 'ChevronRight',
        action: () => {
            if (StoreReview.isAvailable) {
              StoreReview.requestReview();
            } else {
              Linking.openURL(
                "https://itunes.apple.com/us/app/moonwalk-rocket-launches/id1439376174"
              );
            }
          },
      },
      {
        title: 'Say hi 👋',
        icon: 'Twitter',
        action: () => Linking.openURL("https://twitter.com/MaximeNory"),
      },
      {
        title: 'Report an issue',
        icon: 'ChevronRight',
        action: () => Linking.openURL("https://github.com/Illu/moonwalk/issues/new")
      }
    ],
    [
      {
        title: 'Licenses',
        icon: 'ChevronRight',
        action: () => navigation.navigate("Licenses")
      },
      {
        title: 'Source code',
        icon: 'Github',
        action: () => Linking.openURL("https://github.com/Illu/moonwalk"),
      },
      {
        title: 'About',
        icon: 'ChevronRight',
        action: () => Linking.openURL("https://maximenory.com/moonwalk/"),
        preview: `v${Package.version}`,
      },
    ],
  ]

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ActionMenu items={items} />
        <BottomText style={{color: colors.secondaryText}}>2020 - Maxime Nory</BottomText>
      </ScrollView>
    </View>
  )
})

export default Settings;
