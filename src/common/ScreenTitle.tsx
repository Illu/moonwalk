import React from 'react';
import styled from 'styled-components/native';
import Icon from "react-native-vector-icons/FontAwesome5";

const Wrapper = styled.View`
  padding: 40px 0;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 1.5px;
`;

const IconWrapper = styled.TouchableOpacity`
  background: ${({theme}) => theme.secondary};
  padding: 7px;
  border-radius: 10px;
`;

interface Props {
  title: string
}

export const ScreenTitle = ({title}: Props) => (
  <Wrapper>
    <Title>{title}</Title>
    <IconWrapper>
    <Icon name="wrench" size={20} color="#fff" />
    </IconWrapper>

  </Wrapper>
)