import React from 'react';
import styled from 'styled-components/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

const Wrapper = styled.View<{insetBottom: number}>`
  left: 5px;
  right: 5px;
  height: ${({insetBottom}) => insetBottom + 60}px;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  shadow-color: #000000;
  shadow-offset: 0 0;
  shadow-opacity: 0.48;
  shadow-radius: 10px;
  elevation: 14;
  padding-bottom: ${({insetBottom}) => insetBottom}px;
  justify-content: center;
`;

const SearchInput = styled.TextInput`
  background: #444;
  padding: 5px 15px;
  border-radius: 30px;
  margin: 0 30px;
  font-size: 20px;
  text-align: center;
  font-family: Quicksand;
`;


const SearchBar = () => {
  const insets = useSafeArea();
  const {colors} = useTheme();
  return (
    <Wrapper insetBottom={insets.bottom} style={{backgroundColor: colors.background}}>
      <SearchInput placeholder="Search a mission..." placeholderTextColor={colors.placeholderText} style={{backgroundColor: colors.secondary}} />
    </Wrapper>
  )
}

export default SearchBar;