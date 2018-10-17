import React, { Component } from "react";
import { Animated, TouchableOpacity, Easing } from "react-native";

export default class extends Component {
  state = {
    pressAnim: new Animated.Value(1)
  };

  pressAnimation() {
    Animated.timing(this.state.pressAnim, {
      toValue: 0.95,
      duration: 100
    }).start();
  }

  releaseAnimation() {
    Animated.timing(this.state.pressAnim, {
      toValue: 1,
      duration: 100
    }).start();
  }

  render() {
    const { style, children } = this.props;
    const { pressAnim } = this.state;
    return (
      <TouchableOpacity
        onPressIn={() => this.pressAnimation()}
        onPressOut={() => this.releaseAnimation()}
        onPress={() => this.props.onPress()}
        style={style}
      >
        <Animated.View style={[{ transform: [{ scale: pressAnim }] }, style]}>
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
