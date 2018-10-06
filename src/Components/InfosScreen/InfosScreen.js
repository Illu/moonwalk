import React, { Component } from 'react';
import styled from 'styled-components';
import ScreenBackground from '../../Common/ScreenBackground';
import Searchbar from '../../Common/Searchbar';

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding-top: 20px;
  align-items: center;
`;

const Footer = styled.Text`
  color: #aaa;
  font-size: 14px;
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
        {searchResults.data && (
          <>
            <ResultCount>{searchResults.data.total} results </ResultCount> 
            {searchResults.data.launches.map(() => null)}
          </>
        )}
        <Footer>Data provided</Footer>
      </Wrapper>
    );
  }
}
 
export default InfosScreen;