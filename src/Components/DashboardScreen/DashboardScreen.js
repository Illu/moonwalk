import React, { Component } from "react";
import styled from "styled-components";
import { SafeAreaView } from "react-navigation";
import { ScrollView, RefreshControl } from "react-native";
import { observer, inject } from "mobx-react";
import ScreenBackground from "../../Common/ScreenBackground";
import ScreenTitle from "../../Common/ScreenTitle";
import NextLaunchCard from "../NextLaunchCard";
import ErrorCard from "../ErrorCard";
import Loader from "../../Common/Loader";
import CountdownCard from "../CountdownCard/CountdownCard";

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

const ContentWrapper = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
`;

@inject("launches")
@observer
class DashboardScreen extends Component {
  componentDidMount() {
    this.loadUpcomingLaunch();
    this.props.launches.initApp();
  }

  loadUpcomingLaunch() {
    const { numberOfLaunches, loadNextLaunches } = this.props.launches;
    loadNextLaunches(numberOfLaunches > 1 ? 5 : 1);
  }

  navigateToDetails() {
    const data = this.props.launches.upcomingLaunch;
    this.props.navigation.navigate("details", { data });
  }

  render() {
    const { state } = this.props.launches;
    const data = this.props.launches.upcomingLaunch;
    return (
      <Wrapper>
        <ScreenTitle title="Next launch" />
        <ContentWrapper>
          {state === "loading" && this.props.launches.numberOfLaunches === 0 ? (
            <Loader />
          ) : state === "error" ? (
            <ErrorCard onPress={() => this.loadUpcomingLaunch()} />
          ) : (
            data && (
              <ScrollView
                contentContainerStyle={{ flex: 1 }}
                refreshControl={
                  <RefreshControl
                    refreshing={data.state === "loading"}
                    onRefresh={() => this.loadUpcomingLaunch()}
                    tintColor="#fff"
                  />
                }
              >
                <NextLaunchCard
                  data={data}
                  navigateToDetails={() => this.navigateToDetails()}
                  scheduleNotification={data =>
                    this.props.launches.scheduleNotification(data)
                  }
                />
                <CountdownCard data={data} />
              </ScrollView>
            )
          )}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default DashboardScreen;
