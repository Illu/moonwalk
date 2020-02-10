import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import BigTitle from '../common/BigTitle';
import Svg, { Path, Circle } from 'react-native-svg';

const Wrapper = styled.View`

`;

const Image = styled.Image`
  height: 400px;
  width: 100%;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const Location = styled.Text`
  margin: 0 10px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
`;

interface Props {
  route: any;
}

const Details: React.FC<Props> = ({ route }) => {

  const { colors } = useTheme();
  const { data } = route.params;
  console.log(data);


  return (
    <ScrollView>
      <Wrapper style={{ backgroundColor: colors.background }}>
        <Image source={{ uri: data.rocket.imageURL }} />
        <BigTitle title={data.name} />
        <Row>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke={colors.text}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></Path>
          <Circle cx="12" cy="10" r="3"></Circle>
        </Svg><Location>{data.location.name}</Location>
        </Row>
      </Wrapper>
    </ScrollView>
  )
}

export default Details;
