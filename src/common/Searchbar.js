import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.TextInput`
  width: 80%;
  padding: 10px 15px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.cardBackground};
  border-radius: 20px;
  font-size: 20px;
  margin: 20px;
  color: white;
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
      <Wrapper
        value={searchStr}
        placeholder="Search launches..."
        placeholderTextColor="#aaa"
        returnKeyType="search"
        clearButtonMode="always"
        onChangeText={searchStr => this.setState({ searchStr })}
        onSubmitEditing={() => this.props.launchSearch(searchStr)}
      />
    );
  }
}

export default SearchBar;
