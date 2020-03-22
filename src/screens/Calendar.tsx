import React, { useState, useEffect, useContext } from 'react';
import Launches from '../stores/Launches';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { FlatList, Text, RefreshControl, TouchableOpacity, ActivityIndicator, Button, View } from 'react-native';
import { STATES } from '../constants';
import CalendarCard from '../components/CalendarCard';
import { useSafeArea } from 'react-native-safe-area-context';
import { observer } from 'mobx-react';

const Wrapper = styled.View`
  flex: 1;
`;

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
        <Text>Error</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {launchesStore.state === STATES.LOADING && launchesStore.numberOfLaunches < 5 ? (
        <Text>Loading</Text>
      ) : (
          <FlatList
            data={launchesStore.launches}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity key={item.id} onPress={() => navigation.navigate('Details', { data: item })}>
                <CalendarCard data={item} />
              </TouchableOpacity>
            )}
            ListFooterComponent={() => (
              <View style={{ margin: 20 }}>
                {showMoreEnabled &&
                  (launchesStore.state === STATES.LOADING ? (
                    <ActivityIndicator size="large" />
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
