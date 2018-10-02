import React, {Component} from 'react';
import styled from 'styled-components';
import ScreenBackground from '../../Common/ScreenBackground';
import {ScrollView, Linking, View} from 'react-native';
import CountdownCard from '../CountdownCard/CountdownCard';
import Button from '../../Common/Button';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Wrapper = styled(ScreenBackground)`
    flex: 1;
`;


const DetailsWrapper = styled.View`
    background: ${({theme}) => theme.cardBackground};
    margin: 25px;
    border-radius: 20px
    padding: 20px;
`;

const SectionTitle = styled.Text`
    color: white;
    font-weight: bold;
`;

const InfoText = styled.Text`
    color: white;
    font-size: 16px;
    margin-bottom: 15px;
    margin-left: 5px;
`;

const DescText = styled.Text`
    color: white;
    text-align: justify;
    margin: 25px;
`;

const LinksWrapper = styled.View`
    margin: 20px;
`;

const ShuttleIcon = styled(Icon)`
    align-self: center;
`;

const Row = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const LinkButton = styled(Button)`
    width: 80%;
`;

const ButtonLabel = styled.Text`
    color: #bbb;
    margin: 3px;
`;

const ButtonWrapper = styled.View`
    flex: 1;
    align-items: center;
`;

export default class extends Component {
    static navigationOptions = {
        title: 'Launch details',
        headerStyle: {
            backgroundColor: '#222437',
          },
        headerTintColor: '#fff',
      };    


    render(){
        const {launches} = this.props;
        const selected = launches.data.launches.filter(launch => launch.id === launches.selectedLaunch)[0]
        console.log(selected)
        const videoLink = selected.vidURLs.length > 0 && selected.vidURLs[0];
        const youtubeLink = "dd";
        const twitterLink = "dd";
        return (
            <Wrapper>
                <ScrollView>
                    <DetailsWrapper>
                        <SectionTitle>Rocket</SectionTitle>
                        <InfoText>{selected.rocket.name}</InfoText>
                        <SectionTitle>Mission{selected.missions.length > 1 && 's'}</SectionTitle>
                        {selected.missions.map(mission => 
                            <InfoText key={mission.id} >{mission.name}</InfoText>
                        )}
                        <SectionTitle>Location</SectionTitle>
                        <InfoText>{selected.location.name}</InfoText>
                        <SectionTitle>Time</SectionTitle>
                        <InfoText>{selected.net}</InfoText>
                    </DetailsWrapper>
                    <ShuttleIcon name="space-shuttle" size={28} color="#eee" />
                    {selected.missions.map(mission =>
                        <DescText key={mission.id} >{mission.description}</DescText>
                    )}
                    <CountdownCard data={selected} />
                    <LinksWrapper>
                        <Row>
                            <ButtonWrapper>
                                <LinkButton icon="video" type='fire' disabled={!videoLink} onPress={() => Linking.openURL(videoLink)} />
                                <ButtonLabel>Livestream</ButtonLabel>
                            </ButtonWrapper>
                            <ButtonWrapper>
                                <LinkButton icon="twitter" type="blue" disabled={!twitterLink} onPress={() => Linking.openURL(twitterLink)} />
                                <ButtonLabel>Twitter</ButtonLabel>
                            </ButtonWrapper>
                        </Row>
                        <Row>
                            <ButtonWrapper>
                                <LinkButton icon="youtube" type="red" disabled={!youtubeLink} onPress={() => Linking.openURL(youtubeLink)} />
                                <ButtonLabel>Youtube</ButtonLabel>
                            </ButtonWrapper>
                            <ButtonWrapper>
                                <LinkButton icon="plus" disabled onPress={() => {}} />
                                <ButtonLabel>more...</ButtonLabel>
                            </ButtonWrapper>
                        </Row>
                    </LinksWrapper>
                </ScrollView>
            </Wrapper>
        )
    }
}