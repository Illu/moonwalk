import React from 'react';
import styled from 'styled-components/native';
import { Countdown } from './Countdown';

const Wrapper = styled.View`
  flex: 1;
  margin: 16px 0 22px 0;
  border-radius: 40px;
  overflow: hidden;
  background: ${({ theme }) => theme.secondary};
  justify-content: space-between;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  opacity: .95;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Label = styled.View`
  background: ${({ theme }) => theme.primary};
  padding: 7px 10px;
  margin: 20px;
  border-radius: 10px;
  align-self: flex-end;
`;

const LabelText = styled.Text`
  color: ${({ theme }) => theme.secondary};
  font-size: 20px;
`;

interface Props {
  imgUrl?: string;
  lspName: string;
  lspAbbrev: string;
  wsstamp: string;
}

export const NextLaunchCard = (props: Props) => {
  const { imgUrl, lspName, lspAbbrev, wsstamp } = props;

  const lspLabelText = lspName.length > 20 ? lspAbbrev : lspName;

  return (
    <Wrapper>
      {/* @TODO display another image if we don't have any */}
      {imgUrl && <BackgroundImage source={{ uri: imgUrl }} />}
      <Label>
        <LabelText>
          {lspLabelText}
        </LabelText>
      </Label>
      <Countdown wsstamp={wsstamp} />
    </Wrapper>
  )
}