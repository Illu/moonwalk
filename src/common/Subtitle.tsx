import React from 'react';
import styled from 'styled-components/native';


const Wrapper = styled.View`
  margin: 16px 0;
`;

const SubtitleText = styled.Text`
  color: ${({theme}) => theme.inactive};
  font-size: 20px;
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