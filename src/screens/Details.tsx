import React from 'react';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { ScrollView, Linking, View } from 'react-native';
import Icon from '../common/Icon';
import { useSafeArea } from 'react-native-safe-area-context';
import Label from '../common/Label';
import Countdown from '../common/Countdown';

const Image = styled.ImageBackground`
  height: 400px;
  width: 100%;
`;

const Title = styled.Text`
  font-family: Quicksand;
  margin: 16px 0;
  font-weight: bold;
  font-size: 28px;
`;

const ContentWrapper = styled.View`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  margin-top: -30px;
  padding: 16px;
`;

const Location = styled.Text`
  margin-left: 10px;
  font-size: 13px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DescText = styled.Text`
  text-align: justify;
  margin-bottom: 16px;
  font-size: 17px;
`;

const LinkButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonTitle = styled.Text`
  margin-left: 10px;
`;

const CloseIconWrapper = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  position: absolute;
  right: 16px;
  align-items: center;
  justify-content: center;
`;

interface Props {
  route: any;
}

const Details: React.FC<Props> = ({ route, navigation }) => {

  const { colors } = useTheme();
  const { data } = route.params;
  const inset = useSafeArea();
  const videoLink = data.vidURLs.length > 0 && data.vidURLs[0];

  console.log(data);

  return (
    <ScrollView>
      <View style={{ backgroundColor: colors.background }}>
        <Image source={{ uri: data.rocket.imageURL }}>
          <CloseIconWrapper style={{ backgroundColor: colors.background, top: inset.top + 8 }} onPress={navigation.goBack}>
            <Icon name="X" size={30} />
          </CloseIconWrapper>
        </Image>
        <ContentWrapper style={{ backgroundColor: colors.background }}>
          <Title style={{ color: colors.text }}>{data.name}</Title>
          <Row>
            <Icon name="Pin" />
            <Location style={{ color: colors.secondaryText }}>{data.location.name}</Location>
          </Row>
          {data.location.typeName && (
            <Row>
              <Icon name="Pin" />
              <Location style={{ color: colors.secondaryText }}>{data.location.typeName}</Location>
            </Row>
          )}
          {data.missions.map(mission => (
            <View key={mission.id} style={{ marginTop: 16 }}>
              {mission.typeName && (
                <Label text={mission.typeName} />
              )}
              <DescText style={{ color: colors.text }} key={mission.id}>{mission.description}</DescText>
            </View>
          ))}
          <Countdown wsstamp={data.wsstamp} />
            <LinkButton
              disabled={!videoLink}
              onPress={() => Linking.openURL(videoLink)}
            >
              <Icon name={videoLink ? "Video" : "VideoOff"} />
            <ButtonTitle style={{color: colors.text}}>{videoLink ? "Watch Livestream" : "Livestream unavailable"}</ButtonTitle>
            </LinkButton>
        </ContentWrapper>
      </View>
    </ScrollView>
  )
}

export default Details;
