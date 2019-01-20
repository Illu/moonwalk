import React, { Component } from "react";
import styled from "styled-components";
import { Animated } from "react-native";

const FullWidthWrapper = styled.View`
  align-items: center;
  margin: 10px;
`;

const Wrapper = styled(Animated.View)`
  align-items: center;
  width: 46px;
`;

const Center = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background: white;
`;

const OrbitLine = styled.View`
  height: 46px;
  width: 46px;
  border-radius: 23px;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: white;
`;

const Moon = styled.View`
  height: 14px;
  width: 14px;
  border-radius: 7px;
  background: white;
  position: absolute;
  left: 34px;
  top: 0;
`;

export default class extends Component {
  state = {
    moonAnim: new Animated.Value(0),
    appearAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.state.moonAnim, { toValue: 1, duration: 1000 })
    ).start();
    Animated.timing(this.state.appearAnim, {
      toValue: 1,
      duration: 400
    }).start();
  }

  render() {
    const moonRotation = this.state.moonAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });

    return (
      <FullWidthWrapper>
        <Wrapper
          style={{
            transform: [{ rotate: moonRotation }],
            opacity: this.state.appearAnim
          }}
        >
          <OrbitLine>
            <Center />
          </OrbitLine>
          <Moon />
        </Wrapper>
      </FullWidthWrapper>
    );
  }
}
