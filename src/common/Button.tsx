import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  background: ${({ theme }) => theme.secondary};
  border-radius: 10px;
  padding: 10px 20px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin: 10px 0;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 18px;
`;

interface Props {
  onPress: () => void;
  title: string;
}

export const Button = ({ onPress, title }: Props) => (
  <Wrapper onPress={onPress}>
    <Title>{title}</Title>
  </Wrapper>
)