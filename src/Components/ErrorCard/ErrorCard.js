import React, { Component } from "react";
import styled from "styled-components";
import { Animated, View, Easing } from "react-native";
import Button from "common/Button";
import Icon from "react-native-vector-icons/FontAwesome5";

const Wrapper = styled(Animated.createAnimatedComponent(View))`
    background: ${({ theme }) => theme.cardBackground};
    margin: 25px;
    border-radius: 20px
    align-items: center;
    padding: 20px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 22px;
  margin: 20px 0 10px 0;
`;

const Subtitle = styled.Text`
  color: white;
  font-size: 15px;
  margin: 10px 0 20px 0;
`;

export default class extends Component {
  state = {
    appearAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.appearAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.quad)
    }).start();
  }

  render() {
    const { onPress } = this.props;
    const { appearAnim } = this.state;
    return (
      <Wrapper
        style={{
          opacity: appearAnim,
          transform: [
            {
              translateY: this.state.appearAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [80, 0]
              })
            }
          ]
        }}
      >
        <Icon name="exclamation" size={35} color="white" />
        <Title>Something's wrong</Title>
        <Subtitle>Error while fetching launch data</Subtitle>
        <Button onPress={onPress} type="secondary" title="Retry" />
      </Wrapper>
    );
  }
}
