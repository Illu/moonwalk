import React, {useContext} from 'react';
import { ScrollView, View, Linking } from 'react-native';
import ActionMenu from '../common/ActionMenu';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import Launches from '../stores/Launches';
import AppState from '../stores/AppState';
import { Themes } from '../types';

const Settings = observer(() => {
  const navigation = useNavigation();
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
      },
      {
        title: 'Say hi 👋',
        icon: 'Twitter',
        action: () => Linking.openURL("https://twitter.com/MaximeNory"),
      }
    ],
    [
      {
        title: 'Licenses',
        icon: 'ChevronRight',
      },
      {
        title: 'Source code',
        icon: 'Github',
        action: () => Linking.openURL("https://github.com/Illu/moonwalk"),
      },
    ],
  ]

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ActionMenu items={items} />
      </ScrollView>
    </View>
  )
})

export default Settings;
