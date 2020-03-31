import React from "react";
import styled from "styled-components/native";
import Icon from "../common/Icon";
import { useTheme, useNavigation } from "@react-navigation/native";

const Wrapper = styled.TouchableOpacity``;

const HeaderSettingsButton = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <Wrapper onPress={() => navigation.navigate("Settings")}>
      <Icon name="Settings" color={colors.accent} />
    </Wrapper>
  );
};

export default HeaderSettingsButton;
