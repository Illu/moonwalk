import React from 'react';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native';

const TouchableWrapper = styled.TouchableOpacity`
    shadow-opacity: 0.75;
    shadow-radius: 5px;
    shadow-color: ${({shadow}) => shadow};
    shadow-offset: 0px 0px;
`;

const Wrapper = styled(LinearGradient)`
    border-radius: 10px;
    padding: 15px 30px;
    margin: 0 5px;
`;

const Title = styled.Text`
    color: #efefef;
    font-size: 20px;
    font-weight: bold;
`;

const TYPES = {
    primary: {
        gradient: ['#6b2afd', '#5e15ea'],
        shadow: '#5e15ea',
    },
    secondary: {
        gradient: ['#3a3a63', '#2c2f53'],
        shadow: '#2c2f53',
    }
}

export default ({title, onPress, type = 'primary'}) => (
    <TouchableWrapper onPress={onPress} shadow={TYPES[type].shadow}>
        <Wrapper
            colors={TYPES[type].gradient}
            start={{x: 0.0, y: 0.0}} 
            end={{x: 1.0, y: 0.0}}
        >
            <Title>{title}</Title>
        </Wrapper>
    </TouchableWrapper>
)