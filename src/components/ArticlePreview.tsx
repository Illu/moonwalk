import styled from "styled-components/native";
import React, {useContext} from "react";
import { useTheme } from "@react-navigation/native";
import firebase from "react-native-firebase";
import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";

const Wrapper = styled.TouchableOpacity<{ isFirst: boolean }>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-top-width: ${({ isFirst }) => (isFirst ? 0 : 1)}px;
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
`;

const Subtitle = styled.Text``;

const DetailsWrapper = styled.View`
  flex: 1;
  padding: 10px 5px;
`;

const Dot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
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
  const { colors } = useTheme();
  const appStateStore = useContext(AppState);

  const onArticlePress = () => {
    firebase.analytics().logEvent("OPEN_NEWS_ARTICLE", {
      title: article.title,
      site: article.news_site_long,
    });
    openLink(article.url, appStateStore.browser);
  };

  return (
    <Wrapper
      style={{
        backgroundColor: colors.secondary,
        borderColor: colors.uiAccent,
      }}
      onPress={onArticlePress}
      isFirst={isFirst}
    >
      <Thumbnail source={{ uri: article.featured_image }} />
      <DetailsWrapper>
        <Title style={{ color: colors.text }}>{article.title}</Title>
        <Subtitle style={{ color: colors.secondaryText }}>
          {article.news_site_long}{" "}
          <Dot style={{ backgroundColor: colors.accent }} /> {timePosted}
        </Subtitle>
      </DetailsWrapper>
    </Wrapper>
  );
};

export default ArticlePreview;
