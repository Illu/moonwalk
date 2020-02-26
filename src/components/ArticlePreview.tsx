import styled from 'styled-components/native';
import React from 'react';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Thumbnail = styled.ImageBackground`
  max-width: 50%;
  align-items: center;
  height: ${(screenWidth / 2) + 40}px;
  width: ${(screenWidth / 2) - 32}px;
  border-radius: 30px;
  overflow: hidden;
  justify-content: flex-end;
  margin: 10px 0;
`;

const Title = styled.Text`
  padding: 10px 5px;
  width: 100%;
  color: white;
  align-self: flex-end;
  text-align: center;
  background: rgba(0, 0, 0, 0.8);
  font-family: Quicksand;
`;

interface Props {
  article: any;
}

const ArticlePreview: React.FC<Props> = ({article}) => (
    <Thumbnail source={{uri: article.featured_image}}>
      <Title>{article.title}</Title>  
    </Thumbnail>
)

export default ArticlePreview;