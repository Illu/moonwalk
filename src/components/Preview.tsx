import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';

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
  data: any // TODO: add launch interface
  onPress: () => void;
}

const Preview = ({ data, onPress }) => {

  // const now = new Date();
  // const timeLeft = data.wsstamp * 1000 - now.getTime();
  // const seconds = Math.floor(timeLeft / 1000);
  // const minutes = Math.floor(seconds / 60);
  // const hours = Math.floor(minutes / 60);
  // const days = Math.floor(hours / 24);
  // const finalTime = timeLeft < 0 ? 'TBD' : `${days > 0 ? days + " days" : ''} ${hours % 24} hour${hours % 24 !== 1 ? 's' : ''}`

  return (
    <ItemWrapper onPress={onPress}>
      <Thumbnail
        source={{ uri: data.rocket.imageURL }}
      >
        <Title>{data.name}</Title>
        <Time>{data.windowstart}</Time>
      </Thumbnail>
    </ItemWrapper>
  )
};

export default Preview;