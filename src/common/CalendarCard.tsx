import React from 'react';
import styled from 'styled-components/native';
import { Countdown } from './Countdown';
import { MONTHS } from '../constants';

const Wrapper = styled.View`
  flex: 1;
  margin: 16px 0 22px 0;
  border-radius: 20px;
  padding: 20px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.secondary};
  overflow: hidden;
  background: ${({ theme }) => theme.primary};
  justify-content: space-between;
`;

const Day = styled.Text`
  color: ${({ theme }) => theme.primary};
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
  color: ${({ theme }) => theme.secondary};
  font-size: 15px;
  ${({ bold }) => bold && "font-weight: bold;"} margin-top: 5px;
`;

const DateWrapper = styled.View`
  background: ${({ theme }) => theme.secondary};
  border-radius: 6px;
  width: 50px;
  align-items: center;
  justify-content: center;
  height: 50px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.inactive};
  font-weight: bold;
`;

interface Props {
  data: any; //@TODO create interface for launch data
}

export const CalendarCard = ({data}: Props) => {
  const launchTime = new Date(data.netstamp * 1000);
  return (
    <Wrapper>
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
        <Label numberOfLines={2}>{data.lsp.abbrev}</Label>
      </Row>
      <Desc bold>{data.name}</Desc>
      <Desc numberOfLines={1}>{data.location.name}</Desc>
    </Wrapper>
  )
}