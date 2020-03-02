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

const Wrapper = styled.View`
  flex: 1;
`

interface Props {
  route: any;
}

const News: React.FC<Props> = observer(() => {

  const { colors } = useTheme();
  const newsStore = useContext(NewsStore);
  const inset = useSafeArea();

  const isLoading = newsStore.state === STATES.LOADING;

  const loadData = () => {
    newsStore.loadArticles();
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Wrapper style={{paddingTop: inset.top}}>
      <Header title="News" />
      <ScrollView contentContainerStyle={{ paddingBottom: inset.bottom + 100 }} refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.text} />} >
        {newsStore.news.map((article, index) => (
          <ArticlePreview key={article.id + index} article={article} />
        ))}
      </ScrollView>
    </Wrapper>
  )
})

export default News;
