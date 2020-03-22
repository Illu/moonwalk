import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@react-navigation/native';
import Icon from './Icon';
import { View } from 'react-native';

// --ActionMenu--
// Takes an items object to display an organised menu.

const Wrapper = styled.View``;

const Row = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px 20px 0;
`;

const PreviewText = styled.Text`
  font-size: 16px;
  margin-right: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
`;

const CategoryWrapper = styled.View`
  margin: 20px;
  border-radius: 10px;
  padding: 0 0 0 16px;
`;

const ThumbWrapper = styled.View`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
`;

type Item = {
  title: string,
  icon: string,
  action?: () => any,
  preview?: string,
  thumbIcon?: string,
  thumbColor?: string,
  disabled?: boolean,
}

interface Props {
  items: Array<Item[]>
}

const ActionMenu = ({ items }: Props) => {

  const { colors } = useTheme();

  return (
    <Wrapper style={{ backgroundColor: colors.background }}>
      {
        items.map((subItems, index) => (
          <CategoryWrapper key={index} style={{ backgroundColor: colors.secondary }}>
            {subItems.map((item, i) => (
              <Row key={item.title} style={{ borderColor: colors.uiAccent, borderTopWidth: i !== 0 ? 0.5 : 0 }} onPress={item.action} disabled={item.disabled}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.thumbIcon && (
                    <ThumbWrapper style={{ backgroundColor: item.thumbColor }}>
                      <Icon name={item.thumbIcon} size={18} />
                    </ThumbWrapper>
                  )}
                  <Title>{item.title}</Title>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {item.preview && <PreviewText style={{ color: colors.uiAccent }}>{item.preview}</PreviewText>}
                  <Icon name={item.icon} color={colors.uiAccent} size={25} />
                </View>
              </Row>
            ))}
          </CategoryWrapper>
        ))
      }
    </Wrapper>

  )
}

export default ActionMenu;