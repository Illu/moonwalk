import React, { Component } from "react";
import styled from "styled-components";
import { SafeAreaView } from "react-navigation";
import ScreenBackground from "../../Common/ScreenBackground";
import Searchbar from "../../Common/Searchbar";
import ResultCard from "./ResultCard";
import Loader from "../../Common/Loader";
import { observer, inject } from "mobx-react";

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding-top: 20px;
  align-items: center;
  width: 100%;
`;

const Footer = styled.Text`
  color: #aaa;
  font-size: 14px;
  margin: 20px 0;
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

@inject("search")
@observer
export default class SearchScreen extends Component {
  showDetails = data => {
    this.props.navigation.navigate("details", { data });
  };

  render() {
    const { results, searchLaunches, totalResults, state } = this.props.search;
    return (
      <Wrapper>
        <Searchbar launchSearch={str => searchLaunches(str)} />
        <ScrollWrapper contentContainerStyle={{ alignItems: "center" }}>
          {state === "loading" && <Loader />}
          {results.length > 0 && (
            <>
              <ResultCount>{totalResults || 0} results</ResultCount>
              {results.map(data => (
                <ResultCard
                  key={data.id}
                  data={data}
                  showDetails={this.showDetails}
                />
              ))}
            </>
          )}
          <Footer>Data provided by the Launch Library</Footer>
        </ScrollWrapper>
      </Wrapper>
    );
  }
}
