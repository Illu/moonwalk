import React, { useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { observer } from 'mobx-react';
import Launches from '../stores/Launches';
import Carousel from '../components/Carousel';
import News from '../stores/News';
import { ScrollView } from 'react-native';
import ArticlePreview from '../components/ArticlePreview';
import BigTitle from '../common/BigTitle';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { useSafeArea } from 'react-native-safe-area-context';

const Wrapper = styled.SafeAreaView`
  align-items: center;
`;

const NewsWrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Dashboard = observer(() => {
  const launchesStore = useContext(Launches);
  const newsStore = useContext(News);
  const inset = useSafeArea();

  useEffect(() => {
    launchesStore.loadNextLaunches();
    newsStore.loadArticles();
  }, [])

  return (
    <Wrapper>
      <ScrollView contentContainerStyle={{paddingBottom: inset.bottom + 60}}>
        <Header title="Upcoming" />
        <Carousel launches={launchesStore.launches} />
        <BigTitle title="Latest news" />
        <NewsWrapper>
          {newsStore.news.map((article, index) => (
            <ArticlePreview key={article.id + index} article={article} />
          ))}
        </NewsWrapper>
      </ScrollView>
      <SearchBar />
    </Wrapper>
  );
})

export default Dashboard;