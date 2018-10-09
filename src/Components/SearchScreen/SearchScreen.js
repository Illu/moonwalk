import React, { Component } from 'react';
import styled from 'styled-components';
import ScreenBackground from '../../Common/ScreenBackground';
import Searchbar from '../../Common/Searchbar';
import ResultCard from './ResultCard';
import {ScrollView } from 'react-native';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding-top: 20px;
  align-items: center;
  width: 100%;
`;

const Footer = styled.Text`
  color: #aaa;
  font-size: 14px;
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const ResultCount = styled.Text`
  color: #eee;
  font-size: 16px;
  font-weight: bold;
`;

class InfosScreen extends Component {
  launchSearch (str) {
    this.props.searchLaunches(str);
  }

  render() { 
    const {searchResults} = this.props;
    return (
      <Wrapper>
        <Searchbar launchSearch={(str) => this.launchSearch(str)}/>
        <ScrollWrapper contentContainerStyle={{alignItems: 'center'}}>
          {searchResults.data && (
            <>
              <ResultCount>{searchResults.data.total || 0} results</ResultCount> 
              {searchResults.data.launches.map(data => (
                <ResultCard key={data.id} {...data}>

                </ResultCard>
              ))}
            </>
          )}
          <Footer>Data provided</Footer>
        </ScrollWrapper>
      </Wrapper>
    );
  }
}
 
export default InfosScreen;