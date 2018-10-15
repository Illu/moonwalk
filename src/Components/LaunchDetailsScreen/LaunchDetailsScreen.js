import React, { Component } from 'react';
import styled from 'styled-components';
import openMap from 'react-native-open-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ScreenBackground from '../../Common/ScreenBackground';
import { ScrollView, Linking } from 'react-native';
import {SafeAreaView} from 'react-navigation';
import CountdownCard from '../CountdownCard/CountdownCard';
import Button from '../../Common/Button';
import HeaderBack from '../../Common/HeaderBack';
import Loader from '../../Common/Loader';

const Wrapper = styled(ScreenBackground)`
    flex: 1;
`;

const DetailsWrapper = styled.View`
    background: ${({ theme }) => theme.cardBackground};
    margin: 25px;
    border-radius: 20px;
    padding: 20px;
    overflow: hidden;
`;

const BackgroundImage = styled.Image`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.3;
`;

const ContentWrapper = styled(SafeAreaView)`
    flex: 1;
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
        header: null,
        headerTintColor: '#fff',
    };

    state = {
        hasLoaded: false,
    }

    openMap({ longitude, latitude }) {
        openMap({ longitude, latitude });
    }

    render() {
        const { launches } = this.props;
        const selected = launches.data.launches.filter(launch => launch.id === launches.selectedLaunch)[0]


        if (!selected && !launches.loading) {
            if (!this.state.hasLoaded){
                this.props.loadLaunch(launches.selectedLaunch)
                this.setState({hasLoaded: true})
            }
            return (
                <Wrapper>
                    <HeaderBack ScreenTitle="Launch Details" navigateBack={() => this.props.navigation.goBack()} />
                </Wrapper>
            )
        }

        if (launches.loading || !selected) {
            return (
                <Wrapper>
                    <HeaderBack ScreenTitle="Launch Details" navigateBack={() => this.props.navigation.goBack()} />
                    <Loader />
                </Wrapper>
            )
        }

        const videoLink = selected.vidURLs.length > 0 && selected.vidURLs[0];
        const location = selected.location.name;
        const rocket = selected.rocket.name;
        const pad = selected.location.pads[0];
        const time = selected.net;

        return (
            <Wrapper>
                <ContentWrapper>
                    <HeaderBack ScreenTitle="Launch Details" navigateBack={() => this.props.navigation.goBack()} />
                    <ScrollView>
                        <DetailsWrapper>
                            {rocket &&
                                <>
                                    <BackgroundImage source={{ uri: selected.rocket.imageURL }} />
                                    <SectionTitle>Rocket</SectionTitle>
                                    <InfoText>{rocket}</InfoText>
                                </>
                            }
                            <SectionTitle>Mission{selected.missions.length > 1 && 's'}</SectionTitle>
                            {selected.missions.map(mission =>
                                <InfoText key={mission.id} >{mission.name}</InfoText>
                            )}
                            {location &&
                                <>
                                    <SectionTitle>Location</SectionTitle>
                                    <InfoText>{location}</InfoText>
                                </>
                            }
                            {time &&
                                <>
                                    <SectionTitle>Time</SectionTitle>
                                    <InfoText>{selected.net}</InfoText>
                                </>
                            }
                        </DetailsWrapper>
                        <ShuttleIcon name="space-shuttle" size={28} color="#eee" />
                        {selected.missions.map(mission =>
                            <DescText key={mission.id} >{mission.description}</DescText>
                        )}
                        <CountdownCard data={selected} />
                        <LinksWrapper>
                            <Row>
                                <ButtonWrapper>
                                    <LinkButton icon="video" type='red' disabled={!videoLink} onPress={() => Linking.openURL(videoLink)} />
                                    <ButtonLabel>Livestream</ButtonLabel>
                                </ButtonWrapper>
                                <ButtonWrapper>
                                    <LinkButton icon="map-marked-alt" type="blue" disabled={!pad} onPress={() => this.openMap(pad)} />
                                    <ButtonLabel>Location</ButtonLabel>
                                </ButtonWrapper>
                            </Row>
                        </LinksWrapper>
                    </ScrollView>
                </ContentWrapper>
            </Wrapper>
        )
    }
}