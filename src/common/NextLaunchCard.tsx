import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  padding: 40px 0;
  flex: 1;
  margin: 40px 0;
  border-radius: 40px;
  overflow: hidden;
  background: ${({theme}) => theme.secondary};
`;

const BackgroundImage = styled.Image`
  position: absolute;
  opacity: .9;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

interface Props {
  imgUrl?: string
}

export const NextLaunchCard = (props: Props) => {
  const { imgUrl } = props;

  return (
    <Wrapper>
      <BackgroundImage source={{ uri: "http://live.staticflickr.com/967/42025498972_d022e2bf29_k.jpg" }} />
    </Wrapper>
  )
}