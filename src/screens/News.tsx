import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { ScrollView, Linking, View } from 'react-native';
import Icon from '../common/Icon';
import { useSafeArea, SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { observer } from 'mobx-react';
import NewsStore from '../stores/News';
import ArticlePreview from '../components/ArticlePreview';


const Wrapper = styled.SafeAreaView`
  flex: 1;
`

interface Props {
  route: any;
}

const News: React.FC<Props> = observer(() => {

  const { colors } = useTheme();
  const newsStore = useContext(NewsStore);
  const inset = useSafeArea();

  return (
    <Wrapper>
        <Header title="News" />
      <ScrollView contentContainerStyle={{ paddingBottom: inset.bottom + 100 }}>
        {newsStore.news.map((article, index) => (
            <ArticlePreview key={article.id + index} article={article} />
          ))}
      </ScrollView>
    </Wrapper>
  )
})

export default News;
