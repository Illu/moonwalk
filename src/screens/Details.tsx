import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { ScrollView, Linking, View, Animated } from "react-native";
import Icon from "../common/Icon";
import Label from "../common/Label";
import Countdown from "../common/Countdown";
import ActionMenu from "../common/ActionMenu";
import openMap from "react-native-open-maps";
import firebase from "react-native-firebase";
import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";

const IMAGE_HEIGHT = 400;

const Image = styled(Animated.Image)`
  height: ${IMAGE_HEIGHT + 50}px;
  width: 100%;
  position: absolute;
  background: #888;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 28px;
  padding: 24px 16px;
  text-align: center;
  color: ${({ theme }) => theme.text};
`;

const ContentWrapper = styled.View`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -30px;
  background: ${({ theme }) => theme.background};
`;

const PinLabel = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  padding-right: 20px;
  color: ${({ theme }) => theme.text};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const DescText = styled.Text`
  margin-bottom: 16px;
  font-size: 17px;
  color: ${({ theme }) => theme.text};
`;

const DescWrapper = styled.View`
  padding: 20px;
  margin: 16px 0;
  background: ${({ theme }) => theme.secondary};
`;

const Subtitle = styled.Text`
  margin: 30px 0 0 20px;
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

interface Props {
  route: any;
}

const Details: React.FC<Props> = ({ route, navigation }) => {
  useEffect(() => {
    firebase.analytics().logEvent("SEE_DETAILS", { value: data.name });
  }, []);

  const [scrollY] = useState(new Animated.Value(0));
  const { colors } = useTheme();
  const appStateStore = useContext(AppState);

  const { data } = route.params;
  const videoLink = data.vidURLs.length > 0 && data.vidURLs[0];
  const wikiLink = data.missions[0]?.wikiURL;

  const actionItems = [
    [
      {
        title: "Livestream",
        icon: "ChevronRight",
        preview: !videoLink && "Unavailable",
        thumbIcon: !videoLink ? "VideoOff" : "Video",
        thumbColor: "#fa8435",
        disabled: !videoLink,
        action: () => {
          firebase
            .analytics()
            .logEvent("OPEN_LIVESTREAM", { value: data.name });
          Linking.openURL(videoLink);
        },
      },
      {
        title: "Location",
        icon: "ChevronRight",
        thumbIcon: "Pin",
        thumbColor: "#2dcd55",
        action: () => {
          const { longitude, latitude } = data.location.pads[0];
          firebase.analytics().logEvent("OPEN_MAPS", { value: data.name });
          openMap({ longitude, latitude });
        },
        disabled: !data.location.pads[0],
        preview: !data.location.pads[0] && "Unavailable",
      },
      {
        title: "Wikipedia",
        icon: "ChevronRight",
        preview: !wikiLink && "Unavailable",
        thumbIcon: "Globe",
        thumbColor: "#1889ff",
        disabled: !wikiLink,
        action: () => {
          openLink(wikiLink, appStateStore.browser);
          firebase.analytics().logEvent("OPEN_WIKI", { value: data.name });
        },
      },
    ],
  ];

  const ImageScale = scrollY.interpolate({
    inputRange: [-100, 0, 200],
    outputRange: [1.4, 1.2, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={{ overflow: "hidden" }}>
      <Image
        source={{ uri: data.rocket.imageURL }}
        style={{ transform: [{ scale: ImageScale }] }}
      ></Image>
      <Animated.ScrollView
        contentContainerStyle={{ paddingTop: IMAGE_HEIGHT }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
          }
        )}
      >
        <View style={{ backgroundColor: colors.background }}>
          <ContentWrapper>
            <Title>{data.name}</Title>
            <Countdown wsstamp={data.wsstamp} status={data.status} />
            <Subtitle>Mission</Subtitle>
            <DescWrapper>
              {data.missions.map((mission) => (
                <View key={mission.id}>
                  <Label text={mission.typeName} />
                  <View style={{ marginTop: 10 }}>
                    <DescText>{mission.description}</DescText>
                  </View>
                </View>
              ))}
              {data.lsp.name && (
                <Row>
                  <Icon name="Briefcase" color={colors.accent} size={20} />
                  <PinLabel numberOfLines={2}>{data.lsp.name}</PinLabel>
                </Row>
              )}
              {data.net && (
                <Row>
                  <Icon name="Clock" color={colors.accent} size={20} />
                  <PinLabel numberOfLines={2}>{data.net}</PinLabel>
                </Row>
              )}
              {data.location.name && (
                <Row>
                  <Icon name="Pin" color={colors.accent} size={20} />
                  <PinLabel numberOfLines={2}>{data.location.name}</PinLabel>
                </Row>
              )}
            </DescWrapper>
            <ActionMenu items={actionItems} />
          </ContentWrapper>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Details;
