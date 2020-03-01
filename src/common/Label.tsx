import React from "react";
import styled from "styled-components";
import { useTheme } from "@react-navigation/native";

const Wrapper = styled.View`
  border-radius: 10px;
  padding: 10px 15px;
  margin: 0 10px;
`;

const LabelText = styled.Text`
  font-family: Quicksand;
  font-weight: bold;
`;

export default ({ text, numberOfLines = 1 }) => {

  const {colors} = useTheme();

  return (
  <Wrapper style={{backgroundColor: colors.secondary}}>
    <LabelText style={{color: colors.secondaryText}} numberOfLines={numberOfLines}>{text}</LabelText>
  </Wrapper>
)};