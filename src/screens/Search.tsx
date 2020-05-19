import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react";
import { TouchableOpacity, View } from "react-native";
import Searchbar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";
import BigTitle from "../common/BigTitle";
import Loader from "../common/Loader";
import { STATES } from "../constants";
import Search from "../stores/Search";
import firebase from "react-native-firebase";
import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";
import Icon from "../common/Icon";
import { useTheme } from "@react-navigation/native";

const ContentWrapper = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const Footer = styled.Text`
  font-size: 14px;
  margin: 20px 0;
  color: ${({ theme }) => theme.secondaryText};
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  width: 100%;
`;

const ResultCount = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
  color: ${({ theme }) => theme.text};
`;

const HistoryCard = styled.TouchableOpacity`
  width: 100%;
  background: ${({ theme }) => theme.secondary};
  padding: 15px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-color: ${({ theme }) => theme.uiAccent};
`;

const HistoryText = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const HintText = styled.Text`
  color: ${({ theme }) => theme.text};
  font-size: 15px;
  margin: 15px 20px;
  text-align: center;
`;

const HintTitle = styled.Text`
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 20px;
  margin-top: 100px;
`;

const SearchScreen = observer(({ navigation }) => {
  const searchStore = useContext(Search);
  const appStateStore = useContext(AppState);
  const { colors } = useTheme();
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    firebase.analytics().setCurrentScreen("SEARCH");
    searchStore.initStore();
  }, []);

  const showDetails = (data) => {
    navigation.navigate("Details", { data });
  };
  const { results, searchLaunches, totalResults, state } = searchStore;

  const launchSearch = (text: string) => {
    firebase.analytics().logEvent("SEARCH", { value: text });
    searchLaunches(text);
  };

  return (
    <ContentWrapper>
      <Searchbar
        launchSearch={launchSearch}
        value={searchStr}
        onChangeText={(str) => {
          setSearchStr(str);
          if (str.length === 0) searchStore.clearResults();
        }}
      />
      <ScrollWrapper contentContainerStyle={{ alignItems: "center" }}>
        {state === STATES.LOADING && <Loader />}
        {results.length >= 0 && state === STATES.SUCCESS && (
          <>
            <ResultCount>{totalResults || 0} results</ResultCount>
            {results.map((data) => (
              <ResultCard key={data.id} data={data} showDetails={showDetails} />
            ))}
          </>
        )}
        {state === STATES.IDLE && searchStore.history.length > 0 && (
          <>
            <BigTitle
              title="Recent searches"
              onAction={searchStore.clearHistory}
              actionText="Clear"
            />
            {searchStore.history.map((item, index) => (
              <HistoryCard
                key={index}
                style={{
                  borderTopWidth: index !== 0 ? 0.5 : 0,
                }}
                onPress={() => {
                  setSearchStr(item);
                  searchLaunches(item);
                }}
              >
                <HistoryText>{item}</HistoryText>
                <Icon name="ArrowUpLeft" color={colors.uiAccent} />
              </HistoryCard>
            ))}
          </>
        )}
        {state === STATES.IDLE && searchStore.history.length === 0 && (
          <>
            <HintTitle>Find a launch</HintTitle>
            <HintText>
              Search accross past and upcoming launches with a rocket or mission
              name.
            </HintText>
          </>
        )}
        <TouchableOpacity
          onPress={() =>
            openLink("https://launchlibrary.net/", appStateStore.browser)
          }
        >
          <Footer>Data provided by the Launch Library</Footer>
        </TouchableOpacity>
      </ScrollWrapper>
    </ContentWrapper>
  );
});

export default SearchScreen;
