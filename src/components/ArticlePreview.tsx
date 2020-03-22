import styled from 'styled-components/native';
import React from 'react';
import {Linking} from 'react-native';
import { useTheme } from '@react-navigation/native';

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-bottom-width: 1px;
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

const Subtitle = styled.Text`
`;

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
}

const ArticlePreview: React.FC<Props> = ({ article, timePosted }) => {
  const { colors } = useTheme();
  
  return (
    <Wrapper style={{backgroundColor: colors.secondary, borderColor: colors.uiAccent}} onPress={() => Linking.openURL(article.url)}>
      <Thumbnail source={{ uri: article.featured_image }} />
      <DetailsWrapper>
        <Title style={{ color: colors.text }}>{article.title}</Title>
        <Subtitle style={{ color: colors.secondaryText }}>{article.news_site_long}  <Dot style={{ backgroundColor: colors.accent }} />  {timePosted}</Subtitle>
      </DetailsWrapper>
    </Wrapper>
  )
}

export default ArticlePreview;