import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@react-navigation/native';

const TitleText = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin: 10px 20px;
  font-family: Quicksand;
`;

const BigTitle = ({title}: {title: string}) => {

  const {colors} = useTheme();

  return <TitleText style={{color: colors.text}}>{title}</TitleText>
}

export default BigTitle;