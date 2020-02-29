import React from "react";
import styled from "styled-components";
import Label from "../common/Label";
import { MONTHS } from "../constants";
import { useTheme } from "@react-navigation/native";

const Wrapper = styled.View`
  margin: 20px;
  border-radius: 15px;
  padding: 20px;
  padding-right: 15px;
`;

const DateWrapper = styled.View`
  border-radius: 6px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Day = styled.Text`
  color: white;
  font-weight: bold;
  font-size: ${({ large }) => (large ? 20 : 13)}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Desc = styled.Text`
  color: white;
  font-size: 15px;
  ${({ bold }) => bold && "font-weight: bold;"} margin-top: 5px;
`;

export default ({ data }) => {
  const launchTime = new Date(data.netstamp * 1000);
  const {colors} = useTheme();
  return (
    <Wrapper style={{backgroundColor: colors.secondary}}>
      <Row>
        <DateWrapper>
          {data.netstamp === 0 ? (
            <Day>TBD</Day>
          ) : (
            <>
              <Day>{launchTime.getDate()}</Day>
              <Day>{MONTHS[launchTime.getMonth()]}</Day>
            </>
          )}
        </DateWrapper>
        <Label numberOfLines={2} text={data.lsp.abbrev} />
      </Row>
      <Desc bold>{data.name}</Desc>
      <Desc numberOfLines={1}>{data.location.name}</Desc>
    </Wrapper>
  );
};