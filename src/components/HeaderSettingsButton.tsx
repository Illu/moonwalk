import { useTheme, useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native";

import Icon from "../common/Icon";

const HeaderSettingsButton = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
      <Icon name="Settings" color={colors.accent} />
    </TouchableOpacity>
  );
};

export default HeaderSettingsButton;
