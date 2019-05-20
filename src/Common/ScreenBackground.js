import React from "react";
import LinearGradient from "react-native-linear-gradient";
import styled from "styled-components";

const Wrapper = styled.View`
  background: #fff;
  flex: 1;
`;

export default ({ children, style }) => (
  // <LinearGradient
  //   colors={["#373468", "#222437"]}
  //   start={{ x: 0.0, y: 0.25 }}
  //   end={{ x: 0.5, y: 1.0 }}
  //   style={style}
  // >
  //   {children}
  // </LinearGradient>
  <Wrapper>{children}</Wrapper>
);
