import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableOpacity } from "react-native";

const Wrapper = styled.View`
  padding: 0 25px;
  overflow: visible;
  height: 70px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MainText = styled.Text`
  font-size: 30px;
  font-family: Quicksand;
  color: ${({ theme }) => theme.textColor};
  font-weight: 500;
`;

class ScreenTitle extends Component {
  render() {
    const {
      title,
      style = {},
      settingsLink = false,
      theme,
      navigateToSettings
    } = this.props;
    return (
      <Wrapper style={style}>
        <MainText>{title}</MainText>
        {settingsLink && (
          <TouchableOpacity onPress={navigateToSettings}>
            <Icon name={"cog"} size={25} color="#rgba(46, 80, 130, 0.5)" />
          </TouchableOpacity>
        )}
      </Wrapper>
    );
  }
}

export default withTheme(ScreenTitle);
