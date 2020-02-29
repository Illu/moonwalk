import React, { useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import Launches from '../stores/Launches';
import Carousel from '../components/Carousel';
import News from '../stores/News';
import { ScrollView, RefreshControl } from 'react-native';
import ArticlePreview from '../components/ArticlePreview';
import BigTitle from '../common/BigTitle';
import Header from '../components/Header';
import { useSafeArea } from 'react-native-safe-area-context';
import { STATES } from '../constants';

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
  const navigation = useNavigation();
  const { colors } = useTheme();

  const loadData = () => {
    launchesStore.loadNextLaunches();
    newsStore.loadArticles();
  }

  useEffect(() => {
    loadData();
  }, [])

  const isLoading = newsStore.state === STATES.LOADING || launchesStore.state === STATES.LOADING;

  return (
    <Wrapper>
      <Header title="Moonwalk" />
      <ScrollView contentContainerStyle={{ paddingBottom: inset.bottom + 100 }} refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.text}/>}
      >
        <BigTitle title="Upcoming" />
        <Carousel launches={launchesStore.launches} onItemPress={(data) => navigation.navigate('Details', { data })} />
        <BigTitle title="Latest news" />
        <NewsWrapper>
          {newsStore.news.map((article, index) => (
            <ArticlePreview key={article.id + index} article={article} />
          ))}
        </NewsWrapper>
      </ScrollView>
    </Wrapper>
  );
})

export default Dashboard;