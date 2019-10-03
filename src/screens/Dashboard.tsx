import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import styled from 'styled-components/native';

import { NextLaunchCard, ScreenTitle, Subtitle } from '../common';
import { STATES } from '../constants';

const SafeWrapper = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => (theme === "light" ? "#fff" : "#000")};
`;

const Wrapper = styled.View`
  padding: 0 30px;
  flex: 1;
`;

interface Props {
  launches: any; //@TODO add launches declaration
}

@inject("launches", "appState")
@observer
export class Dashboard extends Component<Props> {
  componentDidMount() {
    const { numberOfLaunches, loadNextLaunches } = this.props.launches;
    loadNextLaunches(numberOfLaunches > 1 ? 5 : 1);
  }

  navigateToDetails = () => {
    const data = this.props.launches.upcomingLaunch;
    this.props.navigation.push("details", { imgUrl: data.rocket.imageURL });
  };

  screenContent() {
    const { state } = this.props.launches;
    switch (state) {
      case STATES.LOADING:
        return <ScreenTitle title="Loading..." />;
      case STATES.ERROR:
        return <ScreenTitle title="Error :(" />;
      case STATES.SUCCESS:
        const data = this.props.launches.upcomingLaunch;
        return (
          <>
            <Transition appear="top">
              <View>
                <ScreenTitle title="Next launch" />
                <Subtitle text={data.name} />
              </View>
            </Transition>
            <NextLaunchCard
              onPress={this.navigateToDetails}
              imgUrl={data.rocket.imageURL}
              lspAbbrev={data.lsp.abbrev}
              lspName={data.lsp.name}
              wsstamp={data.wsstamp}
            />
          </>
        );
    }
  }

  render() {
    // because fluid Navigator doesn't support the theme prop,
    // use our app state theme to set the style ourselves.
    const { theme } = this.props.appState;
    return (
      <SafeWrapper theme={theme}>
        <Wrapper>{this.screenContent()}</Wrapper>
      </SafeWrapper>
    );
  }
}
