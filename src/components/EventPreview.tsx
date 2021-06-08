import React, { useContext } from "react";
import analytics from '@react-native-firebase/analytics';
import styled from "styled-components/native";

import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";
import Label from "../common/Label";

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-top-width: 1px;
  background: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.uiAccent};
`;

const Thumbnail = styled.ImageBackground`
  height: 300px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

const Title = styled.Text`
  text-align: left;
  padding-bottom: 5px;
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const Time = styled.Text`
  text-align: left;
  padding-bottom: 5px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.secondaryText};
`;

const DetailsWrapper = styled.View`
  flex: 1;
  padding: 10px 5px;
`;

interface Props {
  event: any;
}

const EventPreview: React.FC<Props> = ({
  event,
}) => {
  const appStateStore = useContext(AppState);

  const onArticlePress = () => {
    analytics().logEvent("OPEN_EVENT", {
      title: event.name,
      site: event.news_url || event.video_url,
    });
    openLink(event.news_url || event.video_url, appStateStore.browser);
  };

  return (
    <Wrapper onPress={onArticlePress}>
      <Thumbnail source={{ uri: event.feature_image }} />
      <DetailsWrapper>
      <Label text={event.type.name} style={{marginTop: 5, marginBottom: 5}} />
        <Title>{event.name}</Title>
        <Time>{new Date(event.date).toLocaleDateString()} - {new Date(event.date).toLocaleTimeString()}</Time>
        <Subtitle>
          {event.description}
        </Subtitle>
      </DetailsWrapper>
    </Wrapper>
  );
};

export default EventPreview;
