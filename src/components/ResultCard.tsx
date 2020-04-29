import React from "react";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const Wrapper = styled.TouchableOpacity`
  padding: 20px;
  height: 100px;
  width: 100%;
  justify-content: center;
  border-bottom-width: 1px;
  background: ${({ theme }) => theme.secondary};
  border-color: ${({ theme }) => theme.uiAccent};
`;

const Title = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const ResultCard = ({ data, showDetails }) => {
  const { name, net } = data;
  const { colors } = useTheme();

  return (
    <Wrapper
      onPress={() => showDetails(data)}
    >
      <Title>{name}</Title>
      <Subtitle>{net}</Subtitle>
    </Wrapper>
  );
};

export default ResultCard;
