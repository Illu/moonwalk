import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { ScrollView, Linking, View } from 'react-native';
import Icon from '../common/Icon';
import { useSafeArea } from 'react-native-safe-area-context';
import Label from '../common/Label';
import Countdown from '../common/Countdown';
import ActionMenu from '../common/ActionMenu';

const IMAGE_HEIGHT = 400;

const Image = styled.Image`
  height: ${IMAGE_HEIGHT + 50}px;
  width: 100%;
  position: absolute;
  background: #888;
`;

const Title = styled.Text`
  font-weight: bold;
  font-size: 28px;
  padding: 24px 16px;
  text-align: center;
`;

const ContentWrapper = styled.View`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -30px;
`;

const Location = styled.Text`
  margin-left: 10px;
  font-size: 13px;
  padding-right: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DescText = styled.Text`
  margin-bottom: 16px;
  font-size: 17px;
`;

const DescWrapper = styled.View`
  padding: 20px;
  margin: 16px 0;
`;

interface Props {
  route: any;
}

const Details: React.FC<Props> = ({ route, navigation }) => {

  const { colors } = useTheme();
  const { data } = route.params;
  const videoLink = data.vidURLs.length > 0 && data.vidURLs[0];
  const wikiLink = data.missions[0].wikiURL;
  console.log(data);

  const actionItems = [
    [
      {
        title: 'Livestream',
        icon: 'ChevronRight',
        preview: !videoLink && 'Unavailable',
        thumbIcon: !videoLink ? 'VideoOff' : 'Video',
        thumbColor: '#fa8435',
        disabled: !videoLink,
        action: () => Linking.openURL(videoLink),
      },
      {
        title: 'Location',
        icon: 'ChevronRight',
        thumbIcon: 'Pin',
        thumbColor: '#2dcd55',
        action: () => { },
        disabled: !data.location.typeName,
        preview: !data.location.typeName && 'Unavailable'
      },
      {
        title: 'Wikipedia',
        icon: 'ChevronRight',
        preview: !wikiLink && 'Unavailable',
        thumbIcon: 'Globe',
        thumbColor: '#1889ff',
        disabled: !wikiLink,
        action: () => Linking.openURL(wikiLink),
      },
    ],
  ]

  return (
    <>
      <Image source={{ uri: data.rocket.imageURL }}></Image>
      <ScrollView contentContainerStyle={{ paddingTop: IMAGE_HEIGHT }}>
        <View style={{ backgroundColor: colors.background }}>
          <ContentWrapper style={{ backgroundColor: colors.background }}>
            <Title style={{ color: colors.text }}>{data.name}</Title>

            <Countdown wsstamp={data.wsstamp} />

            <DescWrapper style={{ backgroundColor: colors.secondary }}>
              <Row>
                <Icon name="Pin" color={colors.accent} />
                <Location numberOfLines={2} style={{color: colors.text}}>{data.location.name}</Location>
              </Row>
              {data.missions.map(mission => (
                <View key={mission.id}>
                  <Label text={mission.typeName} />
                  <View style={{ marginTop: 10 }}>
                    <DescText style={{ color: colors.text }} key={mission.id}>
                      {mission.description}
                    </DescText>
                  </View>
                </View>
              ))}
            </DescWrapper>
            <ActionMenu items={actionItems} />
          </ContentWrapper>
        </View>
      </ScrollView>
    </>
  )
}

export default Details;
