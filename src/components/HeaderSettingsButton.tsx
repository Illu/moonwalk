import React from "react";
import Icon from "../common/Icon";
import { useTheme, useNavigation } from "@react-navigation/native";
import {TouchableOpacity} from 'react-native';

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
