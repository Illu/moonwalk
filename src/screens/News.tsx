import React, { useContext, useEffect } from "react";
import styled from "styled-components/native";
import { useTheme, RouteProp } from "@react-navigation/native";
import { ScrollView, RefreshControl, View } from "react-native";
import { observer } from "mobx-react";
import NewsStore from "../stores/News";
import ArticlePreview from "../components/ArticlePreview";
import { STATES } from "../constants";
import Loader from "../common/Loader";
import ErrorCard from "../common/ErrorCard";
import firebase from "react-native-firebase";

const Title = styled.Text`
  margin: 20px 16px 10px 16px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

interface Props {
  route: any;
}

const News: React.FC<Props> = observer(() => {
  const { colors } = useTheme();
  const newsStore = useContext(NewsStore);

  const isLoading = newsStore.state === STATES.LOADING;

  const loadData = () => {
    newsStore.loadArticles();
  };

  useEffect(() => {
    loadData();
    firebase.analytics().setCurrentScreen("NEWS");
  }, []);

  const currentTime = new Date().getTime() / 1000;
  let lastTime = -1;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={loadData}
          tintColor={colors.text}
        />
      }
    >
      {isLoading && <Loader />}
      {newsStore.state === STATES.ERROR && (
        <ErrorCard
          message="Unable to fetch the news, make sure your device is online. If this is a bug, feel free to report an issue or send me a message from the settings menu."
          onRetry={() => loadData()}
        />
      )}
      {newsStore.news.map((article, index) => {
        const timeDiff = currentTime - article.date_published;
        const daysDiff = Math.floor(timeDiff / 60 / 60 / 24);
        const timePosted =
          daysDiff > 0
            ? `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`
            : "Today";
        const showTitle = daysDiff !== lastTime;
        if (showTitle) {
          lastTime = daysDiff;
        }
        return (
          <View key={article.id + index}>
            {showTitle && (
              <Title>
                {daysDiff === 0
                  ? "Today"
                  : daysDiff === 1
                  ? "Yesterday"
                  : "Older"}
              </Title>
            )}
            <ArticlePreview
              article={article}
              timePosted={timePosted}
              isFirst={showTitle}
            />
          </View>
        );
      })}
    </ScrollView>
  );
});

export default News;
