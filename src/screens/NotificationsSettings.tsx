import React, { useContext } from "react";
import styled from "styled-components";
import { ScrollView, Switch } from "react-native";
import { useTheme } from "@react-navigation/native";
import Launches from "../stores/Launches";
import { observer } from "mobx-react";

const ToggleWrapper = styled.View`
  flex-direction: row;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: space-between;
`;

const NotifWrapper = styled.View`
  flex-direction: row;
  height: 80px;
  margin: 15px 20px;
  border-radius: 10px;
  align-items: center;
`;

const ToggleTitle = styled.Text`
  font-size: 16px;
`;

const Notice = styled.Text`
  margin: 0 20px;
  font-size: 13px;
`;

const Title = styled.Text`
  margin: 20px 20px 0 20px;
  font-size: 20px;
  font-weight: bold;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  font-size: 30px;
`;

const DelayText = styled.Text`
  font-size: 16px;
`;

const NotificationsSettings = observer(() => {
  const { colors } = useTheme();
  const launchesStore = useContext(Launches);

  const hitSlopValue = 60;
  const touchableHitSlop = {
    top: hitSlopValue / 2,
    left: hitSlopValue,
    right: hitSlopValue,
    bottom: hitSlopValue / 2,
  };

  return (
    <ScrollView>
      <ToggleWrapper style={{ backgroundColor: colors.secondary }}>
        <ToggleTitle style={{ color: colors.text }}>
          Enable Notifications
        </ToggleTitle>
        <Switch
          value={launchesStore.notifications.enabled}
          onValueChange={launchesStore.toggleNotifications}
        />
      </ToggleWrapper>
      <Notice style={{ color: colors.placeholderText }}>
        Moonwalk is an ad-free App, and will only send notifications about
        upcoming rocket launches.
      </Notice>
      <Title
        style={{
          color: colors.text,
          opacity: launchesStore.notifications.enabled ? 1 : 0.3,
        }}
      >
        Send a notification
      </Title>
      <NotifWrapper
        style={{
          backgroundColor: colors.secondary,
          opacity: launchesStore.notifications.enabled ? 1 : 0.3,
        }}
      >
        <Row>
          <Button
            disabled={!launchesStore.notifications.enabled}
            hitSlop={touchableHitSlop}
            onPress={() => launchesStore.changeNotificationDelay(-5)}
          >
            <ButtonText style={{ color: colors.accent }}>-</ButtonText>
          </Button>
          <DelayText
            style={{ color: colors.text }}
          >{`${launchesStore.notifications.delay} minutes before launch`}</DelayText>
          <Button
            disabled={!launchesStore.notifications.enabled}
            hitSlop={touchableHitSlop}
            onPress={() => launchesStore.changeNotificationDelay(5)}
          >
            <ButtonText style={{ color: colors.accent }}>+</ButtonText>
          </Button>
        </Row>
      </NotifWrapper>
    </ScrollView>
  );
});

export default NotificationsSettings;
