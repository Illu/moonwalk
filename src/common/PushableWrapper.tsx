import React, { Component } from "react";
import { Animated, TouchableOpacity } from "react-native";

interface Props {
  onPress: () => {};
  style?: any;
}

export class PushableWrapper extends Component<Props> {
  state = {
    pressAnim: new Animated.Value(1),
    appearAnim: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.appearAnim, {
      toValue: 1,
      duration: 300
    }).start();
  }

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
        <Animated.View
          style={[
            {
              transform: [{ scale: pressAnim }],
              opacity: this.state.appearAnim
            },
            style
          ]}
        >
          {children}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
