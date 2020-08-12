import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { useColorScheme } from "react-native-appearance";
import styled from "styled-components/native";

import BlackLogo from "../../assets/Images/logo_black.png";
import WhiteLogo from "../../assets/Images/logo_white.png";
import AppState from "../stores/AppState";
import { Themes } from "../types";

const { width } = Dimensions.get("window");

const Image = styled.Image`
  height: 30px;
  width: 30px;
  position: absolute;
  top: -30px;
  left: ${width / 2 - 15}px;
`;

const HeaderTitleLogo = () => {
  const scheme = useColorScheme();
  const appStateStore = useContext(AppState);

  let Logo = BlackLogo;
  if (appStateStore.theme === Themes.automatic) {
    if (scheme === "dark") {
      Logo = WhiteLogo;
    }
  } else if (appStateStore.theme === Themes.dark) {
    Logo = WhiteLogo;
  }

  return <Image source={Logo} />;
};

export default HeaderTitleLogo;
