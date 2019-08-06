import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';

import { NextLaunchCard, ScreenTitle, Subtitle, Countdown } from '../common';
import styled from 'styled-components/native';
import { STATES } from '../constants';

const SafeWrapper = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  padding: 0 30px;
  flex: 1;
`;

interface Props {
  launches: any; //@TODO add launches declaration
}

@inject("launches")
@observer
export class Dashboard extends Component<Props> {

  componentDidMount() {
    const { numberOfLaunches, loadNextLaunches } = this.props.launches;
    loadNextLaunches(numberOfLaunches > 1 ? 5 : 1);
  }

  screenContent() {
    const { state } = this.props.launches;
    switch (state) {
      case STATES.LOADING:
        return <ScreenTitle title="Loading..." />
      case STATES.ERROR:
        return <ScreenTitle title="Error :(" />
      case STATES.SUCCESS:
        const data = this.props.launches.upcomingLaunch;
        return (
          <>
            <ScreenTitle title="Next launch" />
            <Subtitle text={data.name} />
            <NextLaunchCard imgUrl={data.rocket.imageURL} lspAbbrev={data.lsp.abbrev} lspName={data.lsp.name} wsstamp={data.wsstamp} />
          </>
        )
    }
  }

  render() {
    return (
      <SafeWrapper>
        <Wrapper>
          {this.screenContent()}
        </Wrapper>
      </SafeWrapper>
    );
  }
}