import React, { Component } from 'react';
import styled from 'styled-components/native';
import { observer, inject } from "mobx-react";
import { ScreenTitle, NextLaunchCard } from '../common';

const SafeWrapper = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  padding: 0 30px;
  flex: 1;
`;

class Dashboard extends Component {

  render() {
    console.log(this.props)

    return (
      <SafeWrapper>
        <Wrapper>
          <ScreenTitle title="Upcoming" />
          <NextLaunchCard />
        </Wrapper>
      </SafeWrapper>
    );
  }
}

export default inject("launches")(observer(Dashboard));
