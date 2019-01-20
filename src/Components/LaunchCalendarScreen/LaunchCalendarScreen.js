import React, { Component } from "react";
import styled from "styled-components";
import { ScrollView, TouchableOpacity, RefreshControl } from "react-native";
import { observer, inject } from "mobx-react";
import ScreenBackground from "../../Common/ScreenBackground";
import ScreenTitle from "../../Common/ScreenTitle";
import CalendarCard from "../CalendarCard/CalendarCard";
import Loader from "../../Common/Loader";
import ErrorCard from "../ErrorCard";
import Button from "../../Common/Button";
import PushableWrapper from "../../Common/PushableWrapper";

const Wrapper = styled(ScreenBackground)`
  flex: 1;
  padding: 40px 0 0 0;
`;

const LoadMoreButton = styled(Button)`
  margin: 0px 20% 20px 20%;
`;

@inject("launches")
@observer
export default class extends Component {
  navigateToDetails(data) {
    this.props.navigation.navigate("details", { data });
  }

  componentDidMount() {
    this.refreshCalendar();
  }

  refreshCalendar = () => {
    this.props.launches.loadNextLaunches(5);
  };

  render() {
    const data = this.props.launches;

    if (data.state === "error") {
      return (
        <Wrapper>
          <ScreenTitle title="Launch Calendar" />
          <ErrorCard onPress={this.refreshCalendar} />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <ScreenTitle title="Launch Calendar" />
        {data.state === "loading" && data.numberOfLaunches < 5 ? (
          <Loader />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={data.state === "loading"}
                onRefresh={this.refreshCalendar}
                tintColor="#fff"
              />
            }
          >
            {data.launches.map(launch => (
              <PushableWrapper
                key={launch.id}
                onPress={() => this.navigateToDetails(launch)}
              >
                <CalendarCard data={launch} />
              </PushableWrapper>
            ))}
            {/* <LoadMoreButton
              title="Load more"
              onPress={() => data.loadMoreLaunches(5)}
            /> */}
          </ScrollView>
        )}
      </Wrapper>
    );
  }
}
