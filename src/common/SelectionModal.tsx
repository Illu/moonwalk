import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Modal, Animated } from "react-native";
import styled from "styled-components/native";

import { Browsers } from "../types";
import Icon from "./Icon";

const Wrapper = styled.SafeAreaView`
  background: rgba(0, 0, 0, 0.5);
  flex: 1;
  padding: 8px;
  justify-content: flex-end;
`;

const ButtonsWrapper = styled.View`
  justify-content: center;
  align-items: center;
  min-height: 50px;
  border-radius: 10px;
  margin: 5px 10px;
  background: ${({ theme }) => theme.secondary};
`;

const Button = styled.TouchableOpacity<{ border: boolean }>`
  padding: 15px 20px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  border-top-width: ${({ border }) => (border ? 1 : 0)}px;
  border-color: ${({ theme }) => theme.uiAccent};
`;

const ButtonTitle = styled.Text`
  margin-left: 20px;
  flex: 1;
  font-size: 16px;
  color: ${({ theme }) => theme.accent};
`;

const CancelTitle = styled.Text`
  font-weight: bold;
  font-size: 15px;
  align-self: center;
  color: ${({ theme }) => theme.accent};
`;

const ModalTitle = styled.Text`
  padding: 15px 0;
  color: ${({ theme }) => theme.secondaryText};
`;

interface Action {
  title: string;
  icon: string;
  action: () => any;
  id: Browsers;
}

interface Props {
  closeModal: () => any;
  actions: Action[];
  selected: Browsers;
  title: string;
}

const SelectionModal: React.FC<Props> = ({
  closeModal,
  title,
  actions,
  selected,
}) => {
  const { colors } = useTheme();

  const appearAnim = new Animated.Value(300);

  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: 0,
      duration: 200,
    }).start();
  });

  return (
    <Modal presentationStyle="overFullScreen" animationType="fade" transparent>
      <Wrapper>
        <Animated.View
          style={{
            transform: [
              {
                translateY: appearAnim,
              },
            ],
          }}
        >
          <ButtonsWrapper>
            <ModalTitle>{title}</ModalTitle>
            {actions.map((action) => (
              <Button
                key={action.id}
                border
                onPress={() => {
                  action.action();
                  closeModal();
                }}
              >
                <Icon name={action.icon} color={colors.accent} />
                <ButtonTitle>{action.title}</ButtonTitle>
                {selected === action.id && (
                  <Icon name="CheckCircle" color={colors.accent} />
                )}
              </Button>
            ))}
          </ButtonsWrapper>
          <ButtonsWrapper>
            <Button onPress={closeModal} style={{ justifyContent: "center" }}>
              <CancelTitle>Cancel</CancelTitle>
            </Button>
          </ButtonsWrapper>
        </Animated.View>
      </Wrapper>
    </Modal>
  );
};

export default SelectionModal;
