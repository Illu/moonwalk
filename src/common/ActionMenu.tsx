import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import Icon from "./Icon";

// --ActionMenu--
// Takes an items object to display an organised menu.

const Wrapper = styled.View`
  background: ${({ theme }) => theme.background};
`;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 20px 0;
  border-color: ${({ theme }) => theme.uiAccent};
`;

const PreviewText = styled.Text`
  font-size: 16px;
  margin-right: 5px;
  color: ${({ theme }) => theme.uiAccent};
`;

const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
`;

const CategoryWrapper = styled.View`
  margin: 20px;
  border-radius: 10px;
  padding: 0 0 0 16px;
  background: ${({ theme }) => theme.secondary};
`;

const ThumbWrapper = styled.View`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

const ThumbImage = styled.Image`
  border-radius: 10px;
  height: 70px;
  width: 70px;
  margin-right: 20px;
`;

type Item = {
  title: string;
  icon: string;
  action?: () => any;
  preview?: string;
  thumbIcon?: string;
  thumbColor?: string;
  disabled?: boolean;
  thumbImage?: any;
};

interface Props {
  items: Array<Item[]>;
}

const ActionMenu = ({ items }: Props) => {
  const { colors } = useTheme();

  return (
    <Wrapper>
      {items.map((subItems, index) => (
        <CategoryWrapper key={index}>
          {subItems.map((item, i) => (
            <Row
              key={`${item.title}${i}`}
              style={{
                borderTopWidth: i !== 0 ? 0.5 : 0,
              }}
              onPress={item.action}
              disabled={item.disabled}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.thumbIcon && (
                  <ThumbWrapper style={{ backgroundColor: item.thumbColor }}>
                    <Icon name={item.thumbIcon} size={18} />
                  </ThumbWrapper>
                )}
                {item.thumbImage && (
                  <ThumbImage
                    source={
                      typeof item.thumbImage === "string"
                        ? { uri: item.thumbImage }
                        : item.thumbImage
                    }
                  />
                )}
                <Title>{item.title}</Title>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {item.preview && <PreviewText>{item.preview}</PreviewText>}
                <Icon name={item.icon} color={colors.uiAccent} size={25} />
              </View>
            </Row>
          ))}
        </CategoryWrapper>
      ))}
    </Wrapper>
  );
};

export default ActionMenu;
