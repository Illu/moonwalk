import React, { Component } from "react";
import styled from "styled-components";
import { useTheme } from "@react-navigation/native";
import { color } from "react-native-reanimated";

const Wrapper = styled.TouchableOpacity`
  padding: 20px;
  height: 120px;
  width: 100%;
  border-bottom-width: 1px;
`;

const Title = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
`;

const ResultCard = ({ data, showDetails }) => {
  const { name, net } = data;
  const { colors } = useTheme();

  return (
    <Wrapper onPress={() => showDetails(data)} style={{backgroundColor: colors.secondary, borderBottomColor: colors.inputBackground}}>
      <Title style={{color: colors.text}}>{name}</Title>
      <Subtitle style={{color: colors.text}}>{net}</Subtitle>
    </Wrapper>
  );
}

export default ResultCard;