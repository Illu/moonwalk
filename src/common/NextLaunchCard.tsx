import React from 'react';
import FastImage from 'react-native-fast-image';
import { Transition } from 'react-navigation-fluid-transitions';
import styled from 'styled-components/native';

import { Countdown } from './Countdown';

const Wrapper = styled.TouchableOpacity`
  /* flex: 1; */
  width: 100%;
  height: 600px;
  /* margin: 16px 0 22px 0; */
  border-radius: 40px;
  overflow: hidden;
  background: ${({ theme }) => theme.secondary};
  justify-content: space-between;
`;

const BackgroundImage = styled(FastImage)`
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
  onPress?: () => void;
}

customTransition = (transitionInfo) => {
  const { progress, start, end } = transitionInfo;
  const borderInterpolation = progress.interpolate({
    inputRange: [0, start, end, 1],
    outputRange: [40, 45, 30, 0],
  });
  return { borderRadius: borderInterpolation };
}

export const NextLaunchCard = (props: Props) => {
  const { imgUrl, lspName, lspAbbrev, wsstamp, onPress } = props;

  const lspLabelText = lspName.length > 20 ? lspAbbrev : lspName;

  return (
    <Transition shared="rocketImg">
      <Wrapper onPress={onPress}>
        {/* @TODO display another image if we don't have any */}
        {imgUrl && <BackgroundImage source={{ uri: "https://mymodernmet.com/wp/wp-content/uploads/archive/hdAaY08Zdn2wMnwjdKJq_shironeko13.jpg" }} />}
        <Transition anchor="rocketImg" disappear='scale'>
        <Label>
          <LabelText>
            {lspLabelText}
          </LabelText>
        </Label>
        </Transition>
        <Transition anchor="rocketImg" disappear='bottom'>
          <Countdown wsstamp={wsstamp} />
        </Transition>
      </Wrapper>
    </Transition>
  )
}