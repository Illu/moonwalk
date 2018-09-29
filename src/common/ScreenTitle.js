import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.View`
    padding: 25px;
    overflow: hidden;
    min-height: 100px;
`;

const MainText = styled.Text`
    font-size: 30px;
    color: #eee;
    font-weight: bold;
    margin-top: 15px;
`;

const BackgroundText = styled.Text`
    position: absolute;
    left: 25px;
    right: 0;
    font-size: 100px;
    color: #aaaaaa11;
    font-weight: bold;
`;

export default ({title, noBackgroundText = false}) => (
    <Wrapper>
        {!noBackgroundText && 
            <BackgroundText numberOfLines={1} ellipsizeMode="clip">
                {title}
            </BackgroundText>
        }
        <MainText>{title}</MainText>
    </Wrapper>
)