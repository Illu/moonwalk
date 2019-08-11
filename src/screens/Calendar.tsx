import React, { Component } from 'react';
import styled from 'styled-components/native'
import { inject, observer } from 'mobx-react';
import { ScreenTitle, CalendarCard, PushableWrapper, Button } from '../common'
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { STATES } from '../constants';

const SafeWrapper = styled.SafeAreaView`
  flex: 1;
`;

const Wrapper = styled.View`
  flex: 1;
`;

const StyledTitle = styled(ScreenTitle)`
  margin: 0 30px;
`;

interface Props {
  launches: any; //@TODO add launches declaration
}

interface State {
  page: number;
}

@inject("launches")
@observer
export class Calendar extends Component<Props, State> {
  state = {
    page: 0
  };

  navigateToDetails(data: any) { //@TODO: create interface for details data
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
      return null;
    }

    return (
      <SafeWrapper>
        <Wrapper>
        <StyledTitle title="Calendar" />
        {data.state === STATES.LOADING && data.numberOfLaunches < 5 ? (
          <ScreenTitle title="Loading" />
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
                        <Button
                          title="Load more"
                          onPress={this.loadMore}
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
                  tintColor="#333"
                />
              }
            />
          )}
          </Wrapper>
      </SafeWrapper>
    );
  }
}