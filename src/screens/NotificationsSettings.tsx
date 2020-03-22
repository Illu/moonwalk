import React, {useContext} from 'react';
import styled from 'styled-components';
import { ScrollView, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Launches from '../stores/Launches';
import { observer } from 'mobx-react';

const ToggleWrapper = styled.View`
  flex-direction: row;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
`;

const ToggleTitle = styled.Text`
  font-size: 16px;
`;

const Notice = styled.Text`
  margin: 0 20px;
  font-size: 13px;
`;

const NotificationsSettings = observer(() => {

  const { colors } = useTheme();
  const launchesStore = useContext(Launches);

  return (
    <ScrollView>
      <ToggleWrapper style={{ backgroundColor: colors.secondary }}>
        <ToggleTitle style={{ color: colors.text }}>Enable Notifications</ToggleTitle>
        <Switch value={launchesStore.notifications.enabled} onValueChange={launchesStore.toggleNotifications}/>
      </ToggleWrapper>
      <Notice style={{ color: colors.placeholderText }}>Moonwalk is an ad-free App, and will only send notifications about upcoming rocket launches.</Notice>
    </ScrollView>
  )
})

export default NotificationsSettings;