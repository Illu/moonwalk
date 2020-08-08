import { useTheme } from "@react-navigation/native";
import React from "react";
import { useSafeArea } from "react-native-safe-area-context";
import styled from "styled-components/native";

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
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.text};
`;

const IconWrapper = styled.View`
  position: absolute;
  left: 24px;
`;

interface Props {
  launchSearch: () => void;
  value: string;
  onChangeText: (str: string) => void;
}

const SearchBar: React.FC<Props> = ({ launchSearch, onChangeText, value }) => {
  const insets = useSafeArea();
  const { colors } = useTheme();
  return (
    <Wrapper insetBottom={insets.bottom}>
      <SearchInput
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={({ nativeEvent }) => launchSearch(nativeEvent.text)}
        placeholder="Search"
        clearButtonMode="always"
        onChangeText={onChangeText}
        placeholderTextColor={colors.placeholderText}
        value={value}
      />
      <IconWrapper>
        <Icon name="Search" color={colors.placeholderText} size={20} />
      </IconWrapper>
    </Wrapper>
  );
};

export default SearchBar;
