import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
  border-radius: 10px;
  padding: 10px 15px;
  margin: 0 10px;
`;

const LabelText = styled.Text`
  color: #8183a5;
  font-family: Quicksand;
  font-weight: bold;
`;

export default ({ text, numberOfLines = 1 }) => (
  <Wrapper>
    <LabelText numberOfLines={numberOfLines}>{text}</LabelText>
  </Wrapper>
);