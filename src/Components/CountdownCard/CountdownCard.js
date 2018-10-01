import React, {Component} from 'react';
import styled from 'styled-components';
import {Animated, Easing, View} from 'react-native';

const Wrapper = styled.View`
    background: ${({theme}) => theme.cardBackground};
    margin: 25px;
    border-radius: 10px
    align-items: center;
    padding: 20px;
    flex-direction: row;
    overflow: hidden;
`;

const Title = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 26px;
`;

const Numbers = styled(Title)`
    font-size: 20px;
`;

const Clock = styled(Animated.createAnimatedComponent(View))`
    position: absolute;
    right: -50px;
    height: 100px;
    width: 100px;
    border-radius: 50px;
    border-width: 2px;
    border-color: white;
    border-style: dashed;
`;

export default class extends Component{

    state = {
        timeLeft: 0,
        ticking: new Animated.Value(0),
    }

    updateTimeLeft(){
        const now = new Date();
        const timeLeft = this.props.data.wsstamp * 1000 - now.getTime();
        this.setState({timeLeft})
        Animated.sequence([
            Animated.timing(
                this.state.ticking,
                {
                  toValue: 1,
                  duration: 800,
                  easing: Easing.bounce,
                  useNativeDriver: true,
                }
              ),
            Animated.spring(
                this.state.ticking,
                {
                  toValue: 0,
                  duration: 0,
                  useNativeDriver: true,
                }
            )
          ]).start()
        
    }

    componentDidMount(){
        this.timer = setInterval(() => {
            this.updateTimeLeft();
          }, 1000);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }

    render() {
        const {timeLeft} = this.state
        const seconds = Math.floor(timeLeft / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        return (
            <Wrapper>
                <Clock style={{transform: [{
                        rotate: this.state.ticking.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['180deg', '200deg'],
                          extrapolate: 'clamp',
                        }),
                      }]}} />
                <Title large>T - </Title>
                <Numbers>{days}d {hours % 24}h {minutes % 60}m {seconds % 60}s</Numbers>
            </Wrapper>
        )
    }
}