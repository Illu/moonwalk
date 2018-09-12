import React from 'react';
import styled from 'styled-components';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Transition} from 'react-navigation-fluid-transitions';

const Title = styled.Text`

`;

const BackButtonText = styled.Text`

`;

const Preview = styled.Image`
    width: ${Dimensions.get('window').width}px;
    height: 400px;
`;

const Wrapper = styled.View`
    flex: 1;
    align-items: center;
`;

const DetailsScreen = (props) => {
    const {name, url, i} = props.navigation.state.params;
    return (
        <Wrapper>
            <Transition shared={`cover${i}`}>
                <Preview source={{uri: url}}></Preview>
            </Transition>
            <TouchableOpacity onPress={() => props.navigation.navigate('home')}>
                <BackButtonText>Go back</BackButtonText>
            </TouchableOpacity>
            <Title>{name}</Title>
        </Wrapper>
    )
}

export default DetailsScreen;