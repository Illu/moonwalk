import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  padding: 40px 0 20px 0;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 35px;
  font-weight: 500;
  letter-spacing: 1.5px;
  color: ${({ theme }) => theme.textPrimary};
`;

const IconWrapper = styled.TouchableOpacity`
  background: ${({ theme }) => theme.light};
  padding: 7px;
  border-radius: 10px;
`;

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const ScreenTitle = ({ title, style }: Props) => (
  <Wrapper style={style}>
    <Title>{title}</Title>
    <IconWrapper>
      <Icon name="wrench" size={20} color="#fff" />
    </IconWrapper>

  </Wrapper>
)