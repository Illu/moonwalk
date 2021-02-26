import React from "react";
import styled from "styled-components/native";

const Wrapper = styled.TouchableOpacity`
  padding: 20px;
  height: 100px;
  width: 100%;
  justify-content: center;
  border-bottom-width: 1px;
  background: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.uiAccent};
`;

const Title = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

const ResultCard = ({ data, showDetails }) => {
  const { name, net } = data;

  return (
    <Wrapper onPress={() => showDetails(data)}>
      <Title>{name}</Title>
      <Subtitle>{new Date(net).toLocaleString()}</Subtitle>
    </Wrapper>
  );
};

export default ResultCard;
