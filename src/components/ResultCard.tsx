import React from "react";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const Wrapper = styled.TouchableOpacity`
  padding: 20px;
  height: 100px;
  width: 100%;
  justify-content: center;
  border-bottom-width: 1px;
`;

const Title = styled.Text`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text``;

const ResultCard = ({ data, showDetails }) => {
  const { name, net } = data;
  const { colors } = useTheme();

  return (
    <Wrapper
      onPress={() => showDetails(data)}
      style={{
        backgroundColor: colors.secondary,
        borderBottomColor: colors.uiAccent,
      }}
    >
      <Title style={{ color: colors.text }}>{name}</Title>
      <Subtitle style={{ color: colors.text }}>{net}</Subtitle>
    </Wrapper>
  );
};

export default ResultCard;
