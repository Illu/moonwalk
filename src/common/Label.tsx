import React from "react";
import styled from "styled-components";
import { useTheme } from "@react-navigation/native";

const Wrapper = styled.View`
  border-radius: 5px;
  padding: 2px 5px;
  margin: 10px 0 0 0;
  align-self: flex-start;
`;

const LabelText = styled.Text`
  font-weight: bold;
  font-size: 12px;
`;

export default ({ text, numberOfLines = 1, color = null, style = null }) => {

  const {colors} = useTheme();

  return (
  <Wrapper style={[{backgroundColor: color || colors.accent}, {...style}]}>
    <LabelText style={{color: colors.secondary}} numberOfLines={numberOfLines}>{text}</LabelText>
  </Wrapper>
)};