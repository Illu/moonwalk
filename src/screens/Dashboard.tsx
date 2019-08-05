import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import { NextLaunchCard, ScreenTitle, Subtitle } from '../common';
import styled from 'styled-components/native';

const SafeWrapper = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  padding: 0 30px;
  flex: 1;
`;

class Dashboard extends Component {

  render() {
    return (
      <SafeWrapper>
        <Wrapper>
          <ScreenTitle title="Next launch" />
          <Subtitle text="Mission" />
          <NextLaunchCard />
        </Wrapper>
      </SafeWrapper>
    );
  }
}

export default inject("launches")(observer(Dashboard));
