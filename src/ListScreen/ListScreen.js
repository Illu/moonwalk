import React, {Component} from 'react';
import styled from 'styled-components';
import {ScrollView, TouchableOpacity} from 'react-native';
import {Transition} from 'react-navigation-fluid-transitions';

const Wrapper = styled.View`
    background: #fff;
    flex: 1;
    margin-top: 20px;
    align-items: center;
`;

const Title = styled.Text`
    color: #eee;
    font-size: 26px;
`;

const Preview = styled.ImageBackground`
    width: 300px;
    height: 300px;
    justify-content: flex-end;
    background: #333;
    padding: 30px;
`;

const Sep = styled.View`
    height: 20px;
`;


const items = [...Array(10)].map(() => ({url: "https://i.imgur.com/sYgUKSk.jpg", name: "This is a title"}))

class ListScreen extends Component {
    render() {
        return (
            <Wrapper>
                <ScrollView>
                {items.map(({url, name}, i) =>
                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('details', {name, url, i})}>
                        <Transition shared={`cover${i}`}>
                            <Preview source={{uri: url}}>
                                <Title>{name}</Title>
                            </Preview>
                        </Transition>
                        <Sep/>
                    </TouchableOpacity>
                    )}
                </ScrollView>
            </Wrapper>
        );
    }
}

export default ListScreen;