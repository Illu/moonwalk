import React from 'react';
import styled from 'styled-components';

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

export default () => (
    <Wrapper>
        <Title>🐶 Hey, what are you lookin' at ?</Title>
    </Wrapper>
)