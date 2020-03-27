import React from 'react';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
`;

const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;

const SeeMoreText = styled.Text`

`;

const BigTitle = ({ title, onSeeMore }: { title: string, onSeeMore?: () => void }) => {

  const { colors } = useTheme();

  return (
    <Wrapper>
      <TitleText style={{ color: colors.text }}>{title}</TitleText>
      {onSeeMore && (
        <TouchableOpacity onPress={onSeeMore}>
          <SeeMoreText style={{ color: colors.text }}>See more</SeeMoreText>
        </TouchableOpacity>
      )}
    </Wrapper>
  )
}

export default BigTitle;