import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 20px;
`;

const TitleText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const SeeMoreText = styled.Text`
  color: ${({ theme }) => theme.text};
`;

const BigTitle = ({
  title,
  onSeeMore,
}: {
  title: string;
  onSeeMore?: () => void;
}) => {
  return (
    <Wrapper>
      <TitleText>{title}</TitleText>
      {onSeeMore && (
        <TouchableOpacity onPress={onSeeMore}>
          <SeeMoreText>See more</SeeMoreText>
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

export default BigTitle;
