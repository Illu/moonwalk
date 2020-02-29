import React from 'react';
import styled from 'styled-components/native';
import { useSafeArea } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';

const Wrapper = styled.View<{insetBottom: number}>`
  justify-content: center;
  padding: 0 16px;
  width: 100%;
  margin: 16px 0;
  background: red;
`;

const SearchInput = styled.TextInput`
  background: #444;
  padding: 5px 15px;
  border-radius: 30px;
  width: 100%;
  font-size: 20px;
  text-align: center;
  font-family: Quicksand;
`;


const SearchBar = ({launchSearch}) => {
  const insets = useSafeArea();
  const {colors} = useTheme();
  return (
    <Wrapper insetBottom={insets.bottom} style={{backgroundColor: colors.background}}>
      <SearchInput onSubmitEditing={({nativeEvent}) => launchSearch(nativeEvent.text)} placeholder="Search a mission..." placeholderTextColor={colors.placeholderText} style={{backgroundColor: colors.secondary}} />
    </Wrapper>
  )
}

export default SearchBar;