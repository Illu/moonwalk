import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Linking, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { observer, inject } from "mobx-react";
import Icon from "react-native-vector-icons/FontAwesome5";
import { version } from "../../../package.json";
import ScreenBackground from "../../Common/ScreenBackground";
import ScreenTitle from "../../Common/ScreenTitle";

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ContentWrapper = styled(SafeAreaView)`
  padding-top: 30px;
  flex: 1;
`;

const SectionsWrapper = styled.ScrollView`
  padding: 0 25px;
  margin-top: 30px;
`;

const Section = styled.TouchableOpacity`
  background: ${({ theme }) => theme.cardBackground};
  padding: 22px;
  height: 70px;
  ${props =>
    props.top &&
    `
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    `} ${props =>
    props.bottom &&
    `
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      margin-bottom: 22px;
    `} margin-top: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${props => props.disabled && `opacity: 0.3;`};
`;

const SectionTitle = styled.Text`
  color: white;
`;

const hitSlopValue = 60;
const touchableHitSlop = {
  top: hitSlopValue / 2,
  left: hitSlopValue,
  right: hitSlopValue,
  bottom: hitSlopValue / 2
};

@inject("launches")
@observer
class SettingsScreen extends Component {
  state = {
    secret: false
  };

  render() {
    const { launches } = this.props;
    const { notifications } = launches;
    const { secret } = this.state;
    return (
      <Wrapper>
        <ContentWrapper>
          <ScreenTitle title="Settings" />
          <SectionsWrapper>
            <Section top>
              <SectionTitle>Notify me</SectionTitle>
              <Switch
                value={notifications.enabled}
                onValueChange={() => this.props.launches.toggleNotifications()}
              />
            </Section>
            <Section
              bottom
              disabled={!notifications.enabled}
              style={{ justifyContent: "space-around" }}
            >
              <TouchableOpacity
                disabled={!notifications.enabled}
                onPress={() => launches.changeNotificationDelay(-5)}
                hitSlop={touchableHitSlop}
              >
                <Icon name="minus" size={18} color="#fff" />
              </TouchableOpacity>
              <SectionTitle>
                {notifications.delay} min ahead of a launch
              </SectionTitle>
              <TouchableOpacity
                disabled={!notifications.enabled}
                onPress={() => launches.changeNotificationDelay(5)}
                hitSlop={touchableHitSlop}
              >
                <Icon name="plus" size={18} color="#fff" />
              </TouchableOpacity>
            </Section>
            <Section
              top
              onPress={() => Linking.openURL("https://twitter.com/maximenory")}
            >
              <SectionTitle>Say hi 👋</SectionTitle>
              <Icon name="twitter" size={22} color="#fff" />
            </Section>
            <Section
              onPress={() =>
                Linking.openURL("https://itunes.apple.com/us/app/")
              }
            >
              <SectionTitle>Give your feedback</SectionTitle>
              <Icon name="app-store-ios" size={22} color="#fff" />
            </Section>
            <Section
              bottom
              onPress={() => Linking.openURL("https://buymeacoff.ee/illu")}
            >
              <SectionTitle>Buy me a coffee</SectionTitle>
              <Icon name="coffee" size={22} color="#fff" />
            </Section>
            <Section
              top
              onPress={() =>
                Linking.openURL("https://github.com/Illu/moonwalk")
              }
            >
              <SectionTitle>Source code</SectionTitle>
              <Icon name="github" size={22} color="#fff" />
            </Section>
            <Section
              bottom
              onPress={() => this.props.navigation.navigate("libraries")}
            >
              <SectionTitle>Licenses</SectionTitle>
              <Icon name="chevron-right" size={22} color="#fff" />
            </Section>
            <Section
              top
              bottom
              onPress={() => this.setState({ secret: !secret })}
            >
              <SectionTitle>About</SectionTitle>
              {secret ? (
                <Icon name="user-secret" size={30} color="#ffec2a" />
              ) : (
                <SectionTitle>Version {version}</SectionTitle>
              )}
            </Section>
          </SectionsWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default SettingsScreen;
