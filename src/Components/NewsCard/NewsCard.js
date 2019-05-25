import React from "react";
import styled from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import { TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

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

const ContentWrapper = styled(LinearGradient)`
  flex: 1;
  justify-content: flex-end;
`;

const Image = styled.ImageBackground`
  margin-top: 5px;
  height: 250px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "49%")};
  align-self: stretch;
`;

const PlaceholderWrapper = styled.View`
  align-items: center;
  margin: 10%;
  opacity: 0.3;
  flex: 1;
  justify-content: center;
`;

const NewsCard = ({ data, fullWidth }) => {
  const { title, featured_image, news_site_long, date_published, url } = data;

  const currentTime = new Date().getTime() / 1000;
  const timeDiff = currentTime - date_published;
  const daysDiff = Math.floor(timeDiff / 60 / 60 / 24);
  const timePosted = daysDiff > 0 ? `${daysDiff}d ago` : "Today";

  return (
    <Image
      resizeMode="cover"
      source={{ uri: featured_image }}
      fullWidth={fullWidth}
    >
      <TouchableOpacity
        onPress={() => Linking.openURL(url)}
        style={{ flex: 1 }}
      >
        {!featured_image && (
          <PlaceholderWrapper>
            <Icon name="eye-slash" size={60} color="#eee" />
          </PlaceholderWrapper>
        )}
        <ContentWrapper
          colors={["#37346800", "#222437"]}
          start={{ x: 0.0, y: 0.4 }}
          end={{ x: 0.0, y: 0.95 }}
        >
          <TextWrapper>
            <Title>{title}</Title>
            <NewsSite>
              {news_site_long} - {timePosted}
            </NewsSite>
          </TextWrapper>
        </ContentWrapper>
      </TouchableOpacity>
    </Image>
  );
};

export default NewsCard;
