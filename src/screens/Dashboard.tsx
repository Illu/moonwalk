import {
  useTheme,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useEffect, useContext } from "react";
import { ScrollView, RefreshControl, View } from "react-native";
import firebase from "react-native-firebase";
import styled from "styled-components/native";

import Countdown from "../common/Countdown";
import ErrorCard from "../common/ErrorCard";
import HeaderTitleLogo from "../common/HeaderTitleLogo";
import Loader from "../common/Loader";
import Preview from "../components/Preview";
import { STATES } from "../constants";
import useAppState from "../hooks/useAppState";
import Launches from "../stores/Launches";

const Wrapper = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

const Dashboard = observer(() => {
  const launchesStore = useContext(Launches);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const loadData = () => {
    launchesStore.loadNextLaunches();
  };

  useEffect(() => {
    loadData();
    firebase.analytics().setCurrentScreen("DASHBOARD");
    launchesStore.initApp();
  }, []);

  useAppState({
    onForeground: () => loadData(),
  });

  const data = launchesStore.launches.length > 0 && launchesStore.launches[0];
  const renderScreenContent = () => {
    switch (launchesStore.state) {
      case STATES.IDLE:
      case STATES.LOADING:
        return <Loader />;
      case STATES.ERROR:
        return (
          <ErrorCard
            message="Something went wrong while retrieving launch data"
            onRetry={() => loadData()}
          />
        );
      default:
        return (
          <>
            <Preview
              data={data}
              onPress={() => navigation.navigate("Details", { data })}
            />
            <Countdown net={data.net} status={data.status.id} />
          </>
        );
    }
  };
  if (data?.net) {
    launchesStore.scheduleNotification(data);
  }

  return (
    <Wrapper>
      <HeaderTitleLogo />
      <ScrollView
        scrollEnabled={true}
        style={{ width: "100%" }}
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={launchesStore.state === STATES.LOADING}
            onRefresh={loadData}
            tintColor={colors.text}
          />
        }
      >
        <View style={{ flex: 1 }}>{renderScreenContent()}</View>
      </ScrollView>
    </Wrapper>
  );
});

export default Dashboard;
