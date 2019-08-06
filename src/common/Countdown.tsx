import React, { Component } from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  align-items: center;
  padding: 5px 10px;
  flex-direction: row;
  border-radius: 50px;
  justify-content: space-around;
  background: ${({ theme }) => theme.secondary};
  margin: 10px 25px;
`;

const UnitWrapper = styled.View`
  align-items: center;
  justify-content: center;
  margin: 0 10px;
`;

const Number = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};
`;

const Unit = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.light};
`;

export class Countdown extends Component {
  state = {
    timeLeft: 0
  };

  componentDidMount() {
    this.updateTimeLeft();
    if (this.props.wsstamp) {
      this.timer = setInterval(() => {
        this.updateTimeLeft();
      }, 1000);
    } else {
      this.setState({ timeLeft: 0 });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  updateTimeLeft() {
    const now = new Date();
    const timeLeft = this.props.wsstamp * 1000 - now.getTime();
    this.setState({ timeLeft });
  }

  render() {
    const { timeLeft } = this.state;
    const seconds = Math.floor(timeLeft / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const NoData = timeLeft <= 0;

    return (
      <Wrapper>
        <UnitWrapper>
          <Number>{NoData ? "-" : days}</Number>
          <Unit>{`day${days !== 1 ? "s" : ""}`}</Unit>
        </UnitWrapper>
        <UnitWrapper>
          <Number>{NoData ? "-" : hours % 24}</Number>
          <Unit>{`hour${hours % 24 !== 1 ? "s" : ""}`}</Unit>
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
}