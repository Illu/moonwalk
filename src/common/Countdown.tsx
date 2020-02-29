import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";

const Wrapper = styled.View`
  background: red;
  margin: 25px;
  border-radius: 10px;
  align-items: center;
  padding: 20px;
  flex-direction: row;
  justify-content: space-around;
`;

const UnitWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const Number = styled.Text`
  font-size: 26px;
  font-weight: bold;
  color: white;
`;

const Unit = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #aaa;
  font-family: Quicksand;
`;

let timer;

const Countdown = ({wsstamp}: {wsstamp: number}) => {
  
  const [timeLeft, setTimeLeft] = useState(0);
  const {colors} = useTheme();

  useEffect(() => {
    updateTimeLeft();
    if (wsstamp) {
      timer = setInterval(() => {
        updateTimeLeft();
      }, 1000);
    } else {
      setTimeLeft(0);
    }
    return () => {
      clearInterval(timer);
    }
  }, [])

  const updateTimeLeft = () => {
    const now = new Date();
    const timeLeft = wsstamp * 1000 - now.getTime();
    setTimeLeft(timeLeft);
  }

  const seconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const NoData = timeLeft <= 0;
  
  return (
    <Wrapper style={{backgroundColor: colors.secondary}}>
      <UnitWrapper>
        <Number>{NoData ? "-" : days}</Number>
        <Unit>{`day${days !== 1 ? "s" : ""}`}</Unit>
      </UnitWrapper>
      <UnitWrapper>
        <Number>{NoData ? "-" : hours % 24}</Number>
        <Unit>{`hour${minutes % 24 !== 1 ? "s" : ""}`}</Unit>
      </UnitWrapper>
      <UnitWrapper>
        <Number>{NoData ? "-" : minutes % 60}</Number>
        <Unit>{`minute${minutes % 60 !== 1 ? "s" : ""}`}</Unit>
      </UnitWrapper>
      <UnitWrapper>
        <Number>{NoData ? "-" : seconds % 60}</Number>
        <Unit>{`second${seconds % 60 !== 1 ? "s" : " "}`}</Unit>
      </UnitWrapper>
    </Wrapper>
  );
}


export default Countdown;