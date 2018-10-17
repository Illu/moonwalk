import React, { Component } from "react";
import styled from "styled-components";
import { Switch, Linking } from "react-native";
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

@inject("launches")
@observer
class SettingsScreen extends Component {
  render() {
    const { notifications } = this.props.launches;
    return (
      <Wrapper>
        <ContentWrapper>
          <ScreenTitle title="Settings" />
          <SectionsWrapper>
            <Section top>
              <SectionTitle>Notifications</SectionTitle>
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
              <Icon name="minus" size={22} color="#fff" />
              <SectionTitle>10 min ahead of launch</SectionTitle>
              <Icon name="plus" size={22} color="#fff" />
            </Section>
            <Section top>
              <SectionTitle>Give your feedback</SectionTitle>
              <Icon name="app-store-ios" size={22} color="#fff" />
            </Section>
            <Section
              onPress={() => Linking.openURL("https://twitter.com/maximenory")}
            >
              <SectionTitle>Say hi 👋</SectionTitle>
              <Icon name="twitter" size={22} color="#fff" />
            </Section>
            <Section
              bottom
              onPress={() => Linking.openURL("https://buymeacoff.ee/illu")}
            >
              <SectionTitle>Buy me a coffee</SectionTitle>
              <Icon name="chevron-right" size={22} color="#fff" />
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
            <Section bottom>
              <SectionTitle>Libraries used</SectionTitle>
              <Icon name="chevron-right" size={22} color="#fff" />
            </Section>
            <Section top bottom>
              <SectionTitle>About</SectionTitle>
              <SectionTitle>Version {version}</SectionTitle>
            </Section>
          </SectionsWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default SettingsScreen;
