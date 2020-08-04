import React from "react";
import styled from "styled-components";
import Label from "../common/Label";
import { MONTHS } from "../constants";

const Wrapper = styled.View<{ isFirst: boolean }>`
  padding: 30px 20px;
  border-top-width: ${({ isFirst }) => (isFirst ? 0 : 1)}px;
  background: ${({ theme }) => theme.secondary};
  border-color: ${({ theme }) => theme.uiAccent};
`;

const DateWrapper = styled.View`
  border-radius: 6px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: ${({ theme }) => theme.accentBackground};
`;

const Day = styled.Text`
  font-weight: bold;
  font-size: ${({ large }) => (large ? 20 : 13)}px;
  color: ${({ theme }) => theme.text};
`;

const ContentWrapper = styled.View`
  flex: 1;
  margin-left: 20px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Desc = styled.Text`
  color: white;
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  ${({ bold }) => bold && "font-weight: bold;"}
`;

export default ({ data, isFirst = false }) => {
  const launchTime = new Date(data.net);
  return (
    <Wrapper isFirst={isFirst}>
      <Row>
        <DateWrapper>
          {launchTime.getTime() / 1000 === 0 ? (
            <Day>TBD</Day>
          ) : (
            <>
              <Day>{launchTime.getDate()}</Day>
              <Day>{MONTHS[launchTime.getMonth()]}</Day>
            </>
          )}
        </DateWrapper>
        <ContentWrapper>
          <Desc bold>{data.name}</Desc>
          <Desc numberOfLines={1}>{data.pad.name}</Desc>
          <Label
            numberOfLines={2}
            text={data.launch_service_provider.name.length < 50 ? data.launch_service_provider.name : data.launch_service_provider.abbrev}
          />
        </ContentWrapper>
      </Row>
    </Wrapper>
  );
};
