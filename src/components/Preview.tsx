import React from "react";
import styled from "styled-components/native";

const ItemWrapper = styled.TouchableOpacity`
  border-radius: 30px;
  background: #000000;
  flex: 1;
  overflow: hidden;
  margin: 20px;
  justify-content: space-between;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
`;

const Time = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
  align-self: flex-end;
`;

const Thumbnail = styled.ImageBackground`
  height: 100%;
  justify-content: space-between;
`;

interface Props {
  data: any; // TODO: add launch interface
  onPress: () => void;
}

const Preview = ({ data, onPress }: Props) => (
  <ItemWrapper onPress={onPress}>
    <Thumbnail
      source={{ uri: data.image || data.rocket.configuration.image_url }}
      imageStyle={{ opacity: 0.9 }}
    >
      <Title>{data.name}</Title>
      <Time>{new Date(data.net).toLocaleString()}</Time>
    </Thumbnail>
  </ItemWrapper>
);

export default Preview;
