import React, {Component} from 'react';
import styled from 'styled-components';
import ScreenBackground from '../../Common/ScreenBackground';
import {ScrollView} from 'react-native';
import CountdownCard from '../CountdownCard/CountdownCard';
import Button from '../../Common/Button';

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

export default class extends Component {
    static navigationOptions = {
        title: 'Details',
        headerStyle: {
            backgroundColor: '#222437',
          },
        headerTintColor: '#fff',
      };    


    render(){
        const {launches} = this.props;
        const selected = launches.data.launches.filter(launch => launch.id === launches.selectedLaunch)[0]
        console.log(selected)
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
                    {selected.missions.map(mission =>
                        <DescText key={mission.id} >{mission.description}</DescText>
                    )}
                    <CountdownCard data={selected} />
                    <LinksWrapper>
                        <Button title="Livestream" onPress={() => {}} />
                        <Button title="Twitter" onPress={() => {}} />
                    </LinksWrapper>
                </ScrollView>
            </Wrapper>
        )
    }
}