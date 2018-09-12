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
    color: #333;
`;

const Preview = styled.Image`
    width: 300px;
    height: 300px;
`;

const Sep = styled.View`
    height: 20px;
`;

const items = [...Array(10)].map(() => ({url: "https://i.imgur.com/sYgUKSk.jpg", name: "hai"}))

class ListScreen extends Component {
    render() {
        return (
            <Wrapper>
                <ScrollView>
                <Title>Would you look at that</Title>
                {items.map(({url, name}, i) =>
                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('details', {name, url, i})}>
                        <Transition shared={`cover${i}`}>
                            <Preview source={{uri: url}}></Preview>
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