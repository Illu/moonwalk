import React, { Component } from "react";
import styled from "styled-components";
import { ActivityIndicator, RefreshControl, FlatList } from "react-native";
import { observer, inject } from "mobx-react";
import ScreenBackground from "common/ScreenBackground";
import ScreenTitle from "common/ScreenTitle";
import CalendarCard from "components/CalendarCard";
import Loader from "common/Loader";
import ErrorCard from "components/ErrorCard";
import Button from "common/Button";
import PushableWrapper from "common/PushableWrapper";
import { STATES } from "src/constants";

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
  state = {
    page: 0
  };

  navigateToDetails(data) {
    this.props.navigation.navigate("details", { data });
  }

  componentDidMount() {
    this.refreshCalendar();
  }

  refreshCalendar = () => {
    this.setState({ page: 0 });
    this.props.launches.loadNextLaunches(5);
  };

  loadMore = () => {
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
    this.props.launches.loadMoreLaunches(5);
  };

  render() {
    const data = this.props.launches;
    const showMoreEnabled = this.state.page < 5;

    if (data.state === STATES.ERROR) {
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
        {data.state === STATES.LOADING && data.numberOfLaunches < 5 ? (
          <Loader />
        ) : (
          <FlatList
            data={data.launches}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <PushableWrapper onPress={() => this.navigateToDetails(item)}>
                <CalendarCard data={item} />
              </PushableWrapper>
            )}
            ListFooterComponent={() => (
              <>
                {showMoreEnabled &&
                  (data.state === STATES.LOADING ? (
                    <ActivityIndicator size="large" />
                  ) : (
                    <LoadMoreButton
                      title="Load more"
                      onPress={this.loadMore}
                      disabled={data.state === STATES.LOADING}
                    />
                  ))}
              </>
            )}
            refreshControl={
              <RefreshControl
                refreshing={
                  data.state === STATES.LOADING && this.state.page === 0
                }
                onRefresh={this.refreshCalendar}
                tintColor="#fff"
              />
            }
          />
        )}
      </Wrapper>
    );
  }
}
