import React from "react";
import styled from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome5";

const TouchableWrapper = styled.TouchableOpacity`
  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-color: ${({ shadow }) => shadow};
  shadow-offset: 0px 0px;
  margin: 0 5px;
  border-radius: 10px;
  background: ${({ theme }) => theme.cardBackground};
  ${({ disabled }) => disabled && "opacity: 0.3;"};
`;

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  padding: 15px 30px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Title = styled.Text`
  color: #efefef;
  font-size: 20px;
  font-weight: bold;
  margin-left: 10px;
`;

const TYPES = {
  primary: {
    gradient: ["#6b2afd", "#5e15ea"],
    shadow: "#5e15ea"
  },
  secondary: {
    gradient: ["#3a3a63", "#2c2f53"],
    shadow: "#2c2f53"
  },
  blue: {
    gradient: ["#6e90fe", "#5cd7cd"],
    shadow: "#6e90fe"
  },
  fire: {
    gradient: ["#ffec2a", "#fa53d6"],
    shadow: "#fa53d6"
  },
  red: {
    gradient: ["#FEB692", "#EA5455"],
    shadow: "#EA5455"
  }
};

export default ({
  title,
  onPress,
  type = "primary",
  disabled = false,
  icon,
  style
}) => (
  <TouchableWrapper
    style={style}
    onPress={onPress}
    shadow={TYPES[type].shadow}
    disabled={disabled}
  >
    <Wrapper
      colors={TYPES[type].gradient}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 0.0 }}
    >
      {icon && <Icon name={icon} size={25} color="#efefef" />}
      {title && <Title>{title}</Title>}
    </Wrapper>
  </TouchableWrapper>
);
