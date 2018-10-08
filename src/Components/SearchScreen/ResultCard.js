import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.View`
  background: ${({theme}) => theme.cardBackground};
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

    console.log(this.props)
    return (
      <Wrapper>
        <Title>{this.props.name}</Title>
        <Subtitle>{this.props.net}</Subtitle>
      </Wrapper>
    );
  }
}
 
export default ResultCard;