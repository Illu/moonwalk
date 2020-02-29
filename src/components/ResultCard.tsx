import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.TouchableOpacity`
  padding: 20px;
  width: 85%;
  margin: 10px;
  border-radius: 6px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Subtitle = styled.Text`
  color: white;
`;

const ResultCard = ({ data, showDetails }) => {
  const { name, net } = data;
  return (
    <Wrapper onPress={() => showDetails(data)}>
      <Title>{name}</Title>
      <Subtitle>{net}</Subtitle>
    </Wrapper>
  );
}

export default ResultCard;