import React from 'react';

import styled from 'styled-components/native';


const Wrapper = styled.View``;

const SubtitleText = styled.Text`
  color: ${({theme}) => theme.inactive};
`;

interface Props {
  text: string;
}

export const Subtitle = ({text}: Props) => (
  <Wrapper>
    <SubtitleText>
      {text}
    </SubtitleText>
  </Wrapper>
)