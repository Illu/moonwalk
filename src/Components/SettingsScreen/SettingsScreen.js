import React, { Component } from "react";
import styled from "styled-components";
import ScreenBackground from "../../Common/ScreenBackground";

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

class SettingsScreen extends Component {
  state = {};
  render() {
    return (
      <Wrapper>{/* notifs on/off, delay, themes, links, feedback */}</Wrapper>
    );
  }
}

export default SettingsScreen;
