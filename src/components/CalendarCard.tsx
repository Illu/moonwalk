import React from "react";
import styled from "styled-components";
import Label from "../common/Label";
import { MONTHS } from "../constants";
import { useTheme } from "@react-navigation/native";

const Wrapper = styled.View`
  padding: 30px 20px;
  border-bottom-width: 1px;
`;

const DateWrapper = styled.View`
  border-radius: 6px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Day = styled.Text`
  font-weight: bold;
  font-size: ${({ large }) => (large ? 20 : 13)}px;
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
  ${({ bold }) => bold && "font-weight: bold;"}
`;

export default ({ data }) => {
  const launchTime = new Date(data.netstamp * 1000);
  const {colors} = useTheme();
  console.log("XD", data)
  return (
    <Wrapper style={{backgroundColor: colors.secondary, borderBottomColor: colors.inputBackground}}>
      <Row>
        <DateWrapper style={{backgroundColor: colors.accentBackground}}>
          {data.netstamp === 0 ? (
            <Day>TBD</Day>
          ) : (
            <>
              <Day style={{color: colors.text}}>{launchTime.getDate()}</Day>
              <Day style={{color: colors.text}}>{MONTHS[launchTime.getMonth()]}</Day>
            </>
          )}
        </DateWrapper>
        <ContentWrapper>
          <Desc bold style={{color: colors.text}}>{data.name}</Desc>
          <Desc numberOfLines={1} style={{color: colors.text}}>{data.location.name}</Desc>
          <Label numberOfLines={2} text={data.lsp.name.length < 50 ? data.lsp.name : data.lsp.abbrev} />
        </ContentWrapper>
      </Row>
      
    </Wrapper>
  );
};