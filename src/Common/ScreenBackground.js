import React from "react";
import styled from "styled-components";

const Wrapper = styled.View`
  flex: 1;
  background: white;
`;

export default ({ children, style }) => (
  <Wrapper style={style}>{children}</Wrapper>
);
