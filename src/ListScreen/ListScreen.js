import React, {Component} from 'react';
import styled from 'styled-components';
import {ScrollView } from 'react-native';
import ListItem from './ListItem';

const Wrapper = styled.SafeAreaView`
    background: #fff;
    flex: 1;
    margin-top: 20px;
    align-items: center;
`;

const items = [...Array(10)].map(() => ({url: "https://i.imgur.com/sYgUKSk.jpg", name: "This is a title"}))

class ListScreen extends Component {
    render() {
        return (
            <Wrapper>
                <ScrollView>
                {items.map(({url, name}, i) =>
                    <ListItem url={url} name={name} key={i} i={i} navigation={this.props.navigation} />
                )}
                </ScrollView>
            </Wrapper>
        );
    }
}

export default ListScreen;