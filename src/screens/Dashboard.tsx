import React, { useEffect, useContext } from 'react';
import styled from 'styled-components/native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import Launches from '../stores/Launches';
import News from '../stores/News';
import { ScrollView, RefreshControl, View } from 'react-native';
import Countdown from '../common/Countdown';
import { STATES } from '../constants';
import Preview from '../components/Preview';
import Loader from '../common/Loader';
import ErrorCard from '../common/ErrorCard';

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
  }

  useEffect(() => {
    loadData();
    launchesStore.initApp();
  }, [])

  const data = launchesStore.launches.length > 0 && launchesStore.launches[0];
  const renderScreenContent = () => {
    switch (launchesStore.state) {
      case STATES.IDLE:
      case STATES.LOADING:
        return <Loader />
      case STATES.ERROR:
        return <ErrorCard message="Something went wrong while retrieving launch data" onRetry={() => loadData()} />
      default:
        return (
          <>
            <Preview data={data} onPress={() => navigation.navigate('Details', { data })} />
            <Countdown wsstamp={data.wsstamp} />
          </>
        )
    }
  }

  return (
    <Wrapper>
      <ScrollView scrollEnabled={true} style={{ width: "100%" }} contentContainerStyle={{ flex: 1 }} refreshControl={
        <RefreshControl refreshing={launchesStore.state === STATES.LOADING} onRefresh={loadData} tintColor={colors.text} />}
      >
        <View style={{ flex: 1 }}>
          {renderScreenContent()}
        </View>
      </ScrollView>
    </Wrapper>
  );
})

export default Dashboard;