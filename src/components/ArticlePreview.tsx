import styled from 'styled-components/native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
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
  font-family: Quicksand;
  padding-bottom: 5px;
  font-weight: 700;
`;

const Subtitle = styled.Text`
    font-family: Quicksand;
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
}

const ArticlePreview: React.FC<Props> = ({ article }) => {
  const { colors } = useTheme();
  const currentTime = new Date().getTime() / 1000;
  const timeDiff = currentTime - article.date_published;
  const daysDiff = Math.floor(timeDiff / 60 / 60 / 24);
  const timePosted = daysDiff > 0 ? `${daysDiff}d ago` : "Today";

  return (
    <Wrapper>
      <Thumbnail source={{ uri: article.featured_image }} />
      <DetailsWrapper>
        <Title style={{ color: colors.text }}>{article.title}</Title>
        <Subtitle style={{ color: colors.secondaryText }}>{article.news_site_long}  <Dot style={{ backgroundColor: colors.accent }} />  {timePosted}</Subtitle>
      </DetailsWrapper>
    </Wrapper>
  )
}

export default ArticlePreview;