import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Animated, Button, Easing } from "react-native";
import styled from "styled-components/native";

import Icon from "../common/Icon";

const Wrapper = styled(Animated.View)`
  margin: 40px;
  border-radius: 10px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.secondary};
`;

const Title = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.Text`
  text-align: center;
  margin: 10px;
  color: ${({ theme }) => theme.colors.text};
`;

const Detail = styled.Text`
  text-align: center;
  margin: 10px;
  color: ${({ theme }) => theme.colors.secondaryText};
  font-size: 11;
  font-style: italic;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

interface Props {
  onRetry: () => any;
  message?: string;
  detail?: string | null;
}

const ErrorCard = ({ message, onRetry, detail }: Props) => {
  const { colors } = useTheme();
  const [appearAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.quad),
    }).start();
  }, [appearAnim]);

  return (
    <Wrapper
      style={{
        opacity: appearAnim,
        transform: [
          {
            translateY: appearAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [80, 0],
            }),
          },
        ],
      }}
    >
      <Row>
        <Icon name="Alert" color={colors.text} />
        <Title>Error</Title>
      </Row>
      <Desc>{message || "Something went wrong"}</Desc>
      {detail && <Detail>{detail}</Detail>}
      <Button title="Try again" onPress={onRetry} />
    </Wrapper>
  );
};

export default ErrorCard;
