import { inject } from 'mobx-react';
import React, { Component } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Transition } from 'react-navigation-fluid-transitions';
import styled from 'styled-components/native';

import { ScreenTitle } from '../common';

const Wrapper = styled.View`
  flex: 1;
  background: ${({ theme }) => (theme === "light" ? "#fff" : "#000")};
`;

const ImageHeader = styled(FastImage)`
  width: 100%;
  height: 600px;
  opacity: 0.95;
`;

@inject("appState")
class Details extends Component<any> {
  render() {
    return (
      <Wrapper theme={this.props.appState.theme}>
        <Transition shared="rocketImg">
          <View>
            <ImageHeader
              source={{ uri: this.props.navigation.state.params.imgUrl }}
            />
          </View>
        </Transition>
        <Transition appear='bottom'>
        <ScreenTitle title="test" />
        </Transition>
      </Wrapper>
    );
  }
}

export default Details;
