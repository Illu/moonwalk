import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import BigTitle from '../common/BigTitle';
import Svg, { Path, Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const Settings: React.FC<Props> = () => {

  const { colors } = useTheme();

  return (
    <SafeAreaView>
    <ScrollView>
      <Wrapper style={{ backgroundColor: colors.background }}>
        <BigTitle title="Settings" />
      </Wrapper>
    </ScrollView>
    </SafeAreaView>
  )
}

export default Settings;
