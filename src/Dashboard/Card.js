import React from 'react';
import styled from 'styled-components';
import Label from '../Common/Label';
import Button from '../Common/Button';

const Wrapper = styled.View`
    background: ${({theme}) => theme.cardBackground};
    margin: 20px;
    border-radius: 20px
    align-items: center;
    padding: 20px;
`;

const Title = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 22px;
`;

const Row = styled.View`
    flex-direction: row;
    margin: 10px 0;
`;

export default () => (
    <Wrapper>
        <Title>🐶 Hey, what are you lookin' at ?</Title>
        <Row>
            <Label text="Hello" />
            <Label text="Test" />
        </Row>
        <Row>
            <Button onPress={() => {}} type="secondary" title="Press me"/>
            <Button onPress={() => {}} title="And me"/>
        </Row>
    </Wrapper>
)