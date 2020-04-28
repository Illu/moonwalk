import React, {useEffect} from 'react';
import { Modal, Animated } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import Icon from '../common/Icon';
import { Browsers } from '../types';

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
`;

const Button = styled.TouchableOpacity<{ border: boolean }>`
  padding: 15px 20px;
  width: 100%;
  align-items: center;
  flex-direction: row;
  border-top-width: ${({ border }) => border ? 1 : 0}px;
`;

const ButtonTitle = styled.Text`
  margin-left: 20px;
  flex: 1;
  font-size: 16px;
`;

const CancelTitle = styled.Text`
  font-weight: bold;
  font-size: 15px;
  align-self: center;
`;

const ModalTitle = styled.Text`
  padding: 15px 0;
`;

interface Action {
  title: string;
  icon: string;
  action: () => any;
  id: Browsers
}

interface Props {
  closeModal: () => any;
  actions: Action[];
  selected: Browsers;
  title: string;
}

const SelectionModal = ({ closeModal, title, actions, selected }): Props => {
  const { colors } = useTheme();

  const appearAnim = new Animated.Value(300);
  
  useEffect(() => {
    Animated.timing(appearAnim, {
      toValue: 0,
      duration: 200
    }).start();  
  });

  return (
    <Modal presentationStyle="overFullScreen" animationType="fade" transparent>
      <Wrapper>
        <Animated.View style={{
          transform: [{
            translateY: appearAnim,
          }]
        }}>
          <ButtonsWrapper style={{ backgroundColor: colors.secondary }}>
            <ModalTitle style={{ color: colors.secondaryText }}>{title}</ModalTitle>
            {actions.map(action => (
              <Button key={action.id} border style={{ borderColor: colors.uiAccent }} onPress={() => { action.action(); closeModal() }}>
                <Icon name={action.icon} color={colors.accent} />
                <ButtonTitle style={{ color: colors.accent }}>{action.title}</ButtonTitle>
                {selected === action.id && <Icon name="CheckCircle" color={colors.accent} />}
              </Button>
            ))}
          </ButtonsWrapper>
          <ButtonsWrapper style={{ backgroundColor: colors.secondary }}>
            <Button onPress={closeModal} style={{ justifyContent: 'center' }}>
              <CancelTitle style={{ color: colors.accent }}>Cancel</CancelTitle>
            </Button>
          </ButtonsWrapper>
        </Animated.View>
      </Wrapper>
    </Modal>
  )
}

export default SelectionModal;