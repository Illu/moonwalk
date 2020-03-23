import React, {useContext} from 'react';
import { ScrollView } from 'react-native';
import ActionMenu from '../common/ActionMenu';
import AppState from '../stores/AppState';
import { observer } from 'mobx-react';
import { Themes } from '../types';
import firebase from 'react-native-firebase'

const AppIconSettings = observer(() => {

  const appStateStore = useContext(AppState);

  const switchIcon = (newIcon: string) => {
    
    // firebase.analytics().logEvent("SWITCH_ICON", {value: newIcon})
  }

  const items = [
    [
      {
        title: 'Light',
        icon: appStateStore.theme === Themes.light ? 'CheckCircle' : 'Circle',
        thumbImage: 'https://placekitten.com/400/400',
        action: () => switchIcon(),
      },
      {
        title: 'Dark',
        icon: appStateStore.theme === Themes.dark ? 'CheckCircle' : 'Circle',
        thumbImage: 'https://placekitten.com/400/400',
        action: () => switchIcon(),
      },
    ],
  ]

  return (
    <ScrollView>
      <ActionMenu items={items} />
    </ScrollView>
  )
})

export default AppIconSettings;