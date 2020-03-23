import React, { useState, useEffect, useContext } from 'react';
import Launches from '../stores/Launches';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { FlatList, Text, RefreshControl, TouchableOpacity, ActivityIndicator, Button, View } from 'react-native';
import { STATES } from '../constants';
import CalendarCard from '../components/CalendarCard';
import Loader from '../common/Loader';
import { observer } from 'mobx-react';
import ErrorCard from '../common/ErrorCard';
import firebase from 'react-native-firebase'

const Wrapper = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  margin: 20px 16px 10px 16px;
  font-size: 20px;
  font-weight: bold;
`

interface Props {
  route: any;
}

const Calendar: React.FC<Props> = observer(({ navigation }) => {
  const { colors } = useTheme();
  const [page, setPage] = useState(0);
  const launchesStore = useContext(Launches);
  const refreshCalendar = () => {
    setPage(0);
    launchesStore.loadNextLaunches(5);
  };

  useEffect(() => {
    refreshCalendar();
    firebase.analytics().setCurrentScreen('CALENDAR');
  }, [])

  const loadMore = () => {
    const newPage = page + 1;
    setPage(newPage);
    launchesStore.loadMoreLaunches(5);
  };

  const showMoreEnabled = page < 5;

  if (launchesStore.state === STATES.ERROR) {
    return (
      <Wrapper>
        <ErrorCard onRetry={() => refreshCalendar()} message="Could not retrieve upcoming launches, make sure your device is online. If you think this is a bug, go to settings and tap 'Report an issue', or send me a message on Twitter." />
      </Wrapper>
    );
  }

  let titleIndex = 0;
  const sectionTitles = ["Scheduled", "To be defined"];

  return (
    <Wrapper>
      {launchesStore.state === STATES.LOADING && launchesStore.numberOfLaunches < 5 ? (
        <Loader />
      ) : (
          <FlatList
            style={{ paddingTop: 20 }}
            data={launchesStore.launches}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {

              const showTitle = titleIndex === 0 || (item.netstamp === 0 && titleIndex === 1);
              if (showTitle) titleIndex++;

              return (
                <>
                  {showTitle && <Title style={{ color: colors.text }}>{sectionTitles[titleIndex - 1]}</Title>}
                  <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Details', { data: item })}>
                    <CalendarCard data={item} />
                  </TouchableOpacity>
                </>
              )
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
                refreshing={
                  launchesStore.state === STATES.LOADING && page === 0
                }
                onRefresh={refreshCalendar}
                tintColor={colors.text}
              />
            }
          />
        )}
    </Wrapper>
  )
})

export default Calendar;
