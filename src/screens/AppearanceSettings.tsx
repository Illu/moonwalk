import React, {useContext} from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import ActionMenu from '../common/ActionMenu';
import AppState from '../stores/AppState';
import { observer } from 'mobx-react';
import { Themes } from '../types';

const Wrapper = styled.View`
  margin: 30px 20px;
  border-radius: 10px;
  padding: 20px;
`;

const AppearanceSettings = observer(() => {

  const {colors} = useTheme();
  const appStateStore = useContext(AppState);

  const items = [
    [
      {
        title: 'Automatic',
        icon: appStateStore.theme === Themes.automatic ? 'CheckCircle' : 'Circle',
        action: () => appStateStore.setTheme(Themes.automatic),
      },
      {
        title: 'Light',
        icon: appStateStore.theme === Themes.light ? 'CheckCircle' : 'Circle',
        action: () => appStateStore.setTheme(Themes.light),
      },
      {
        title: 'Dark',
        icon: appStateStore.theme === Themes.dark ? 'CheckCircle' : 'Circle',
        action: () => appStateStore.setTheme(Themes.dark),
      },
    ],
  ]

  return (
    <ScrollView>
      <ActionMenu items={items} />
    </ScrollView>
  )
})

export default AppearanceSettings;