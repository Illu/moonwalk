import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { useTheme, RouteProp } from '@react-navigation/native';
import { ScrollView, RefreshControl } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { observer } from 'mobx-react';
import NewsStore from '../stores/News';
import ArticlePreview from '../components/ArticlePreview';
import { STATES } from '../constants';

const Title = styled.Text`
  margin: 20px 16px 10px 16px;
  font-size: 20px;
  font-weight: bold;
`

interface Props {
  route: any;
}

const News: React.FC<Props> = observer(() => {

  const { colors } = useTheme();
  const newsStore = useContext(NewsStore);

  const isLoading = newsStore.state === STATES.LOADING;

  const loadData = () => {
    newsStore.loadArticles();
  }

  useEffect(() => {
    loadData();
  }, [])

  const currentTime = new Date().getTime() / 1000;
  let lastTime = -1;

  return (
    <ScrollView refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.text} />} >
      {newsStore.news.map((article, index) => {
        const timeDiff = currentTime - article.date_published;
        const daysDiff = Math.floor(timeDiff / 60 / 60 / 24);
        const timePosted = daysDiff > 0 ? `${daysDiff}d ago` : "Today";
        const showTitle = daysDiff !== lastTime;
        if (showTitle) {
          lastTime = daysDiff;
        }
        return (
          <>
            {showTitle && <Title>{daysDiff === 0 ? "Today" : daysDiff === 1 ? "Yesterday" : "Older"}</Title>}
            <ArticlePreview key={article.id + index} article={article} timePosted={timePosted} />
          </>
        )
      }
      )}
    </ScrollView>
  )
})

export default News;
