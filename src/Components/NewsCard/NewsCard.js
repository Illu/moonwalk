import React from "react";
import styled from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Linking } from "react-native";

const Title = styled.Text`
  color: white;
  font-weight: bold;
`;

const NewsSite = styled.Text`
  color: white;
  margin-top: 2px;
  font-size: 11px;
`;

const TextWrapper = styled.View`
  margin: 10px;
`;

// const ContentWrapper = styled(LinearGradient)`
//   flex: 1;
//   justify-content: flex-end;
// `;

const Image = styled.Image`
  margin-top: 5px;
  height: 250px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "49%")};
  align-self: stretch;
`;

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
`;

const NewsCard = ({ data, fullWidth }) => {
  const { title, featured_image, news_site_long, date_published, url } = data;

  const currentTime = new Date().getTime() / 1000;
  const timeDiff = currentTime - date_published;
  const daysDiff = Math.floor(timeDiff / 60 / 60 / 24);
  const timePosted = daysDiff > 0 ? `${daysDiff}d ago` : "Today";

  return (
    <Wrapper onPress={() => Linking.openURL(url)} style={{ flex: 1 }}>
      <Image fullWidth={fullWidth} source={{ uri: featured_image }} />
      <TextWrapper>
        <Title>{title}</Title>
        <NewsSite>
          {news_site_long} - {timePosted}
        </NewsSite>
      </TextWrapper>
    </Wrapper>
  );
};

export default NewsCard;
