import React, { Component } from "react";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";

const Wrapper = styled.View`
  width: 80%;
  padding: 15px 20px;
  border-radius: 40px;
  font-size: 20px;
  margin: 20px;
  color: white;
  background: white;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled.TextInput`
  flex: 1;
  margin-left: 10px;
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchStr: ""
    };
  }

  render() {
    const { searchStr } = this.state;
    return (
      <Wrapper>
        <Icon name="search" size={20} color="#42446f" />
        <StyledInput
          value={searchStr}
          placeholder="Search launches..."
          placeholderTextColor="#777"
          returnKeyType="search"
          clearButtonMode="always"
          onChangeText={searchStr => this.setState({ searchStr })}
          onSubmitEditing={() => this.props.launchSearch(searchStr)}
        />
      </Wrapper>
    );
  }
}

export default SearchBar;
