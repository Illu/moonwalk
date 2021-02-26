import React, { useContext } from "react";
import firebase from "react-native-firebase";
import styled from "styled-components/native";

import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";

const Wrapper = styled.TouchableOpacity<{ isFirst: boolean }>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-top-width: ${({ isFirst }) => (isFirst ? 0 : 1)}px;
  background: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.uiAccent};
`;

const Thumbnail = styled.ImageBackground`
  height: 100px;
  width: 100px;
  border-radius: 10px;
  overflow: hidden;
  margin-right: 10px;
`;

const Title = styled.Text`
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

const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.accent};
`;

interface Props {
  article: any;
  timePosted: number;
  isFirst?: boolean;
}

const ArticlePreview: React.FC<Props> = ({
  article,
  timePosted,
  isFirst = false,
}) => {
  const appStateStore = useContext(AppState);

  const onArticlePress = () => {
    firebase.analytics().logEvent("OPEN_NEWS_ARTICLE", {
      title: article.title,
      site: article.newsSite,
    });
    openLink(article.url, appStateStore.browser);
  };

  return (
    <Wrapper onPress={onArticlePress} isFirst={isFirst}>
      <Thumbnail source={{ uri: article.imageUrl }} />
      <DetailsWrapper>
        <Title>{article.title}</Title>
        <Subtitle>
          {article.newsSite} <Dot /> {timePosted}
        </Subtitle>
      </DetailsWrapper>
    </Wrapper>
  );
};

export default ArticlePreview;
