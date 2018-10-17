import React, { Component } from "react";
import styled from "styled-components";
import { SafeAreaView } from "react-navigation";
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
    this.props.launches.loadNextLaunches(1);
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
          {state === "loading" ? (
            <Loader />
          ) : state === "error" ? (
            <ErrorCard onPress={() => this.loadUpcomingLaunch()} />
          ) : (
            data && (
              <>
                <NextLaunchCard
                  data={data}
                  navigateToDetails={() => this.navigateToDetails()}
                  scheduleNotification={data =>
                    this.props.launches.scheduleNotification(data)
                  }
                />
                <CountdownCard data={data} />
              </>
            )
          )}
        </ContentWrapper>
      </Wrapper>
    );
  }
}

export default DashboardScreen;
