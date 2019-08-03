import React, {Component} from 'react';
import styled from 'styled-components/native';
import { ScreenTitle } from '../common';

const Wrapper = styled.SafeAreaView`

`;

export class Dashboard extends Component {

  render(){
    return (
      <Wrapper>
        <ScreenTitle title="Next Launch" />
      </Wrapper>
      );
  }
}