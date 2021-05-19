import { useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Animated, Dimensions, View } from "react-native";
import { useSafeArea } from "react-native-safe-area-context";
import styled from "styled-components/native";

import Icon from "../common/Icon";
import Pushable from "../common/Pushable";
import { TABBAR_HEIGHT } from "../constants";

const Wrapper = styled.View`
  height: ${TABBAR_HEIGHT}px;
  align-items: center;
  flex-direction: row;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: ${({ insetBottom }) => insetBottom}px;
`;

const IconWrapper = styled.View`
  height: 40px;
  align-items: center;
  justify-content: center;
`;

const TabIndicatorWrapper = styled(Animated.View)`
  align-items: center;
  position: absolute;
  bottom: 10px;
`;

const TabIndicator = styled.View`
  height: 4px;
  width: 50%;
  border-radius: 2px;
`;

const TabbarComponent = ({ props }) => {
  const insets = useSafeArea();
  const { colors } = useTheme();
  const [switchAnim] = useState(new Animated.Value(0));

  const [appearAnims, setAppearAnims] = useState<Animated.Value[]>([]);

  const { width } = Dimensions.get("window");

  const tabbarWidth = width - 32;

  const TAB_COUNT = 5;

  const indicatorPosition = switchAnim.interpolate({
    inputRange: [0, props.state.routeNames.length - 1],
    outputRange: [0, tabbarWidth - tabbarWidth / TAB_COUNT],
  });

  useEffect(() => {
    const tmp: Animated.Value[] = [];
    props.state.routeNames.forEach((_, i) => {
      tmp[i] = new Animated.Value(0);
    });

    setAppearAnims(tmp);

    const animations = props.state.routeNames.map((_, i) => {
      return Animated.spring(tmp[i], {
        toValue: 1,
        useNativeDriver: true,
      });
    });
    Animated.stagger(100, animations).start();
  }, []);

  useEffect(() => {
    Animated.spring(switchAnim, {
      toValue: props.state.index,
      duration: 250,
    }).start();
  }, [props.state.index]);

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Wrapper insetBottom={insets.bottom}>
        {props.state.routeNames.map((route, index) => (
          <Animated.View
            style={{
              opacity: appearAnims[index],
              transform: [
                { scale: appearAnims.length ? appearAnims[index] : 0 },
              ],
            }}
          >
            <Pushable
              key={route}
              onPress={() => {
                const isFocused = props.state.index === index;
                const event = props.navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  props.navigation.navigate(route);
                }
              }}
            >
              <IconWrapper style={{ width: tabbarWidth / TAB_COUNT }}>
                <Icon color={colors.text} name={route} />
              </IconWrapper>
            </Pushable>
          </Animated.View>
        ))}
        <TabIndicatorWrapper
          style={{ left: indicatorPosition, width: tabbarWidth / TAB_COUNT }}
          insetBottom={insets.bottom}
        >
          <TabIndicator style={{ backgroundColor: colors.accent }} />
        </TabIndicatorWrapper>
      </Wrapper>
    </View>
  );
};

const Tabbar: React.FC = (routeProps) => <TabbarComponent props={routeProps} />;

export default Tabbar;
