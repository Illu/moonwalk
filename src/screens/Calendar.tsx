import { useNavigation, useTheme } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  View
} from "react-native";
import styled from "styled-components/native";

import ErrorCard from "../common/ErrorCard";
import Loader from "../common/Loader";
import CalendarCard from "../components/CalendarCard";
import { CALENDAR_TABS, STATES } from "../constants";
import Launches from "../stores/Launches";
import Events from "../stores/Events";
import EventPreview from "../components/EventPreview";

const Wrapper = styled.View`
  flex: 1;
`;

const Row = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
  margin: 10px 0;
`;

const TabButton = styled.TouchableOpacity<{ selected: boolean }>`
  padding: 5px 20px;
  margin: 0 10px;
  height: 30px;
  width: 30%;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: ${({ selected, theme }) => selected ? theme.colors.uiAccent : theme.colors.secondary};
`;

const TabButtonTitle = styled.Text<{ selected: boolean }>`
  flex: 1;
  font-size: 16px;
  color: ${({ theme, selected }) => selected ? theme.colors.text : theme.colors.secondaryText};
`;

const Title = styled.Text`
  margin: 20px 16px 10px 16px;
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

const Calendar = observer(() => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [page, setPage] = useState(0);
  const [selectedTab, setSelectedTab] = useState(CALENDAR_TABS.LAUNCHES)
  const launchesStore = useContext(Launches);
  const eventsStore = useContext(Events);

  const refreshCalendar = useCallback(() => {
    if (selectedTab === CALENDAR_TABS.LAUNCHES) {
    setPage(0);
    launchesStore.loadNextLaunches(5);
  } else if (selectedTab === CALENDAR_TABS.EVENTS) {
    eventsStore.loadEvents()
  }

  }, [launchesStore]);

  useEffect(() => {
    refreshCalendar();
  }, []);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    launchesStore.loadMoreLaunches(5);
  };

  const switchTab = (newTab: CALENDAR_TABS) => {
    console.log('current', selectedTab)
    console.log('new', newTab)
    if (newTab === CALENDAR_TABS.EVENTS) {
      eventsStore.loadEvents();
    }
    setSelectedTab(newTab)
  }

  const showMoreEnabled = page < 5;

  if (launchesStore.state === STATES.ERROR || eventsStore.state === STATES.ERROR) {
    return (
      <Wrapper>
        <ErrorCard
          onRetry={() => refreshCalendar()}
          message="Could not retrieve upcoming launches or events, make sure your device is online. If you think this is a bug, go to settings and tap 'Report an issue', or send me a message on Twitter."
          detail={launchesStore.error || eventsStore.error}
        />
      </Wrapper>
    );
  }

  let titleIndex = 0;
  const sectionTitles = ["Scheduled", "To be Determined"];

  return (
    <Wrapper testID="Calendar">
      <Row>
        <TabButton selected={selectedTab === CALENDAR_TABS.LAUNCHES} onPress={() => switchTab(CALENDAR_TABS.LAUNCHES)}>
          <TabButtonTitle selected={selectedTab === CALENDAR_TABS.LAUNCHES}>Launches</TabButtonTitle>
        </TabButton>
        <TabButton selected={selectedTab === CALENDAR_TABS.EVENTS} onPress={() => switchTab(CALENDAR_TABS.EVENTS)}>
          <TabButtonTitle selected={selectedTab === CALENDAR_TABS.EVENTS}>Events</TabButtonTitle>
        </TabButton>
      </Row>
      {((launchesStore.state === STATES.LOADING &&
        launchesStore.numberOfLaunches < 5) || eventsStore.state === STATES.LOADING) ? (
        <Loader />
      ) : selectedTab === CALENDAR_TABS.EVENTS ? (
        <FlatList
          style={{ paddingTop: 20 }}
          data={eventsStore.events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => 
              <EventPreview event={item} timePosted={{}} />
          }
          ListFooterComponent={() => (
            <View style={{ margin: 20 }}/>
          )}
          refreshControl={
            <RefreshControl
              refreshing={eventsStore.state === STATES.LOADING && page === 0}
              onRefresh={refreshCalendar}
              tintColor={colors.text}
            />
          }
        />
      ) : (
        <FlatList
          style={{ paddingTop: 20 }}
          data={launchesStore.launches}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const showTitle =
              titleIndex === 0 ||
              (new Date(item.net).getTime() / 1000 === 0 && titleIndex === 1);
            if (showTitle) titleIndex++;
            return (
              <>
                {showTitle && <Title>{sectionTitles[titleIndex - 1]}</Title>}
                <TouchableOpacity
                  key={item.id}
                  onPress={() => navigation.navigate("Details", { data: item })}
                >
                  <CalendarCard data={item} isFirst={showTitle} />
                </TouchableOpacity>
              </>
            );
          }}
          ListFooterComponent={() => (
            <View style={{ margin: 20 }}>
              {showMoreEnabled &&
                (launchesStore.state === STATES.LOADING ? (
                  <ActivityIndicator />
                ) : (
                  <Button
                    title="Load more"
                    onPress={loadMore}
                    disabled={launchesStore.state === STATES.LOADING}
                  />
                ))}
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={launchesStore.state === STATES.LOADING && page === 0}
              onRefresh={refreshCalendar}
              tintColor={colors.text}
            />
          }
        />
      )}
    </Wrapper>
  );
});

export default Calendar;
