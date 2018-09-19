import React, { Component } from 'react';
import styled from 'styled-components';
import { TouchableWithoutFeedback, View, Animated, ImageBackground} from 'react-native';
import {Transition} from 'react-navigation-fluid-transitions';

const Title = styled.Text`
    color: #eee;
    font-size: 26px;
`;

const Preview = styled(Animated.createAnimatedComponent(ImageBackground))`
    width: 300px;
    height: 300px;
    justify-content: flex-end;
    background: #333;
    padding: 30px;
    border-radius: 10px;
    overflow: hidden;
`;

const Sep = styled.View`
    height: 20px;
`;

class ListItem extends Component {

    state = {
        pushAnim: new Animated.Value(0),
    }

    onPressIn = () => {
        Animated.spring(this.state.pushAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start()
    }

    onPressOut = () => {
        Animated.spring(this.state.pushAnim, {
            toValue: 0,
            useNativeDriver: true,
        }).start()
    }

    render() {
        const {name, url, i} = this.props;
        const animStyle = {
            transform: [
                {
                    scale: this.state.pushAnim.interpolate({
                        extrapolate: 'clamp',
                        inputRange: [0, 1],
                        outputRange: [1, 0.95],
                    })
                }
            ]
        }

        return(
            <TouchableWithoutFeedback 
                onPress={() => this.props.navigation.navigate('details', {name, url, i})}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
            >
                <View>
                    <Transition shared={`cover${i}`}>
                        <Preview style={animStyle} source={{uri: url}}>
                            <Title>{name}</Title>
                        </Preview>
                    </Transition>
                    <Sep/>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

export default ListItem;