import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.View`
  padding: 0 25px;
  overflow: visible;
  height: 80px;
`;

const MainText = styled.Text`
  font-size: 30px;
  color: #eee;
  font-weight: bold;
  margin-top: 15px;
`;

const BackgroundText = styled.Text`
  position: absolute;
  left: 25px;
  right: 0;
  top: -20px;
  font-size: 100px;
  color: #aaaaaa11;
  font-weight: bold;
`;

export default class extends Component {
  render() {
    const { title, noBackgroundText = false, style = {} } = this.props;
    return (
      <Wrapper style={style}>
        {!noBackgroundText && (
          <BackgroundText numberOfLines={1} ellipsizeMode="clip">
            {title}
          </BackgroundText>
        )}
        <MainText>{title}</MainText>
      </Wrapper>
    );
  }
}
