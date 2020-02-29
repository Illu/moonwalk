import React, { Component, useContext } from "react";
import styled from "styled-components";
import { observer, inject } from "mobx-react";
import { TouchableOpacity, Linking } from "react-native";
import Searchbar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import Loader from "../common/Loader";
import { STATES } from "../constants";
import Search from "../stores/Search";
import { useSafeArea } from "react-native-safe-area-context";

const ContentWrapper = styled.SafeAreaView`
  flex: 1;
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

const SearchScreen = observer(({ navigation }) => {
  const showDetails = data => {
    navigation.navigate("Details", { data });
  };
  const searchStore = useContext(Search);
  const inset = useSafeArea();

  const { results, searchLaunches, totalResults, state } = searchStore;
  return (
    <ContentWrapper>
      <Searchbar launchSearch={str => searchLaunches(str)} />
      <ScrollWrapper contentContainerStyle={{ alignItems: "center", paddingBottom: inset.bottom + 60 }}>
        {state === STATES.LOADING && <Loader />}
        {results.length >= 0 && state === STATES.SUCCESS && (
          <>
            <ResultCount>{totalResults || 0} results</ResultCount>
            {results.map(data => (
              <ResultCard
                key={data.id}
                data={data}
                showDetails={showDetails}
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
  );
})

export default SearchScreen;