import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Wrapper = styled.View`
  flex-direction: row;
  padding: 10px 20px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const SeeMoreText = styled.Text`
  color: ${({ theme }) => theme.accent};
  text-align: right;
`;

const BigTitle = ({
  title,
  onAction,
  actionText,
}: {
  title: string;
  onAction?: () => void;
  actionText?: string;
}) => {
  return (
    <Wrapper>
      <TitleText>{title}</TitleText>
      {actionText && (
        <TouchableOpacity onPress={onAction}>
          <SeeMoreText>{actionText}</SeeMoreText>
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

export default BigTitle;
