import React from "react";
import styled from "styled-components/native";
import { useSafeArea } from "react-native-safe-area-context";
import { useTheme } from "@react-navigation/native";
import Icon from "../common/Icon";

const Wrapper = styled.View<{ insetBottom: number }>`
  justify-content: center;
  padding: 0 16px;
  width: 100%;
  margin: 16px 0;
`;

const SearchInput = styled.TextInput`
  padding: 10px 15px 10px 35px;
  border-radius: 10px;
  width: 100%;
  font-size: 20px;
`;

const IconWrapper = styled.View`
  position: absolute;
  left: 24px;
`;

const SearchBar = ({ launchSearch }) => {
  const insets = useSafeArea();
  const { colors } = useTheme();
  return (
    <Wrapper insetBottom={insets.bottom}>
      <SearchInput
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={({ nativeEvent }) => launchSearch(nativeEvent.text)}
        placeholder="Search"
        placeholderTextColor={colors.placeholderText}
        style={{ backgroundColor: colors.inputBackground, color: colors.text }}
      />
      <IconWrapper>
        <Icon
          color={colors.text}
          name="Search"
          color={colors.placeholderText}
          size={20}
        />
      </IconWrapper>
    </Wrapper>
  );
};

export default SearchBar;
