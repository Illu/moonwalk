import React from "react";
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default () => (
  <Wrapper>
    <ActivityIndicator size="large" />
  </Wrapper>
);