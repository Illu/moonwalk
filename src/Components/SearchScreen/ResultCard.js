import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.TouchableOpacity`
  background: ${({ theme }) => theme.cardBackground};
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

class ResultCard extends Component {
  render() {
    const { name, net } = this.props.data;
    return (
      <Wrapper onPress={() => this.props.showDetails(this.props.data)}>
        <Title>{name}</Title>
        <Subtitle>{net}</Subtitle>
      </Wrapper>
    );
  }
}

export default ResultCard;
