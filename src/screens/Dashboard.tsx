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

const Wrapper = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

const Dashboard = observer(() => {
  const launchesStore = useContext(Launches);
  const newsStore = useContext(News);
  const navigation = useNavigation();
  const { colors } = useTheme();

  const loadData = () => {
    launchesStore.loadNextLaunches();
    newsStore.loadArticles();
  }

  useEffect(() => {
    loadData();
  }, [])

  const isLoading = newsStore.state !== STATES.SUCCESS || launchesStore.state !== STATES.SUCCESS;

  const data = launchesStore.launches[0];

  return (
    <Wrapper>
      <ScrollView scrollEnabled={false} style={{ width: "100%" }} contentContainerStyle={{ flex: 1 }} refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadData} tintColor={colors.text} />}
      >
        <View style={{ flex: 1 }}>
          {isLoading ? null : (
            <>
              <Preview data={data} onPress={() => navigation.navigate('Details', { data })} />
              <Countdown wsstamp={data.wsstamp} />
            </>
          )}
        </View>
      </ScrollView>
    </Wrapper>
  );
})

export default Dashboard;