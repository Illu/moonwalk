import React, { Component } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { TouchableOpacity, Linking } from "react-native";
import { SafeAreaView } from "react-navigation";
import ScreenBackground from "../../Common/ScreenBackground";
import Searchbar from "../../Common/Searchbar";
import ResultCard from "./ResultCard";
import Loader from "../../Common/Loader";
import { STATES } from "../../constants";

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  width: 100%;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  width: 100%;
  align-items: center;
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
        <ContentWrapper>
          <Searchbar launchSearch={str => searchLaunches(str)} />
          <ScrollWrapper contentContainerStyle={{ alignItems: "center" }}>
            {state === STATES.LOADING && <Loader />}
            {results.length >= 0 &&
              state === STATES.SUCCESS && (
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
            <TouchableOpacity
              onPress={() => Linking.openURL("https://launchlibrary.net/")}
            >
              <Footer>Data provided by the Launch Library</Footer>
            </TouchableOpacity>
          </ScrollWrapper>
        </ContentWrapper>
      </Wrapper>
    );
  }
}
