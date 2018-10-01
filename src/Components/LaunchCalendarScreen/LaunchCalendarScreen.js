import React, {Component} from 'react';
import styled from 'styled-components';
import {ScrollView, TouchableOpacity} from 'react-native';
import ScreenBackground from '../../Common/ScreenBackground';
import ScreenTitle from '../../Common/ScreenTitle';
import CalendarCard from '../CalendarCard/CalendarCard';

const Wrapper = styled(ScreenBackground)`
    flex: 1;
    padding: 40px 0 0 0;
`;

export default class extends Component {

    navigateToDetails({id}) {
        this.props.setSelectedLaunch(id);
        this.props.navigation.navigate('details');
    }

    render(){
        const {data} = this.props.launches;
        if (!data){
            return null
        }
        return (
            <Wrapper contentContainerStyle={{flex: 1}}>
                <ScreenTitle title="Launch Calendar" />
                <ScrollView>
                    {data.launches.map(launch => (
                        <TouchableOpacity key={launch.id} onPress={() => this.navigateToDetails(launch)}>
                        <CalendarCard  data={launch} />
                        </TouchableOpacity>
                    ))}                
                </ScrollView>
            </Wrapper>
        )
    }
}