import React from 'react';
import styled from 'styled-components';
import {Dimensions, TouchableOpacity} from 'react-native';
import {Transition} from 'react-navigation-fluid-transitions';

const Title = styled.Text`
    color: #eee;
    font-size: 26px;
`;

const BackButtonText = styled.Text`

`;

const Preview = styled.ImageBackground`
    width: ${Dimensions.get('window').width}px;
    height: 400px;
    justify-content: flex-end;
    background: #333;
    padding: 30px;
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
                <Preview source={{uri: url}} />
            </Transition>
            <TouchableOpacity onPress={() => props.navigation.navigate('home')}>
                <BackButtonText>Go back</BackButtonText>
            </TouchableOpacity>
            <Title>{name}</Title>
        </Wrapper>
    )
}

export default DetailsScreen;