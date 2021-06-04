import { useNavigation, useTheme } from "@react-navigation/native";
import { observer } from "mobx-react";
import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  View,
} from "react-native";
import analytics from '@react-native-firebase/analytics';
import styled from "styled-components/native";

import ErrorCard from "../common/ErrorCard";
import Loader from "../common/Loader";
import CalendarCard from "../components/CalendarCard";
import { STATES } from "../constants";
import Launches from "../stores/Launches";

const Wrapper = styled.View`
  flex: 1;
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
  const launchesStore = useContext(Launches);
  const refreshCalendar = useCallback(() => {
    setPage(0);
    launchesStore.loadNextLaunches(5);
  }, [launchesStore]);

  useEffect(() => {
    refreshCalendar();
  }, []);

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    launchesStore.loadMoreLaunches(5);
  };

  const showMoreEnabled = page < 5;

  if (launchesStore.state === STATES.ERROR) {
    return (
      <Wrapper>
        <ErrorCard
          onRetry={() => refreshCalendar()}
          message="Could not retrieve upcoming launches, make sure your device is online. If you think this is a bug, go to settings and tap 'Report an issue', or send me a message on Twitter."
          detail={launchesStore.error}
        />
      </Wrapper>
    );
  }

  let titleIndex = 0;
  const sectionTitles = ["Scheduled", "To be Determined"];

  return (
    <Wrapper testID="Calendar">
      {launchesStore.state === STATES.LOADING &&
        launchesStore.numberOfLaunches < 5 ? (
        <Loader />
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
