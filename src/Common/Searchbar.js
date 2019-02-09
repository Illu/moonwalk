import React, { Component } from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/FontAwesome5";

const Wrapper = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 15px 20px 10px 20px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  color: white;
  background: white;
  box-shadow: 0px 0px 20px #ddd;
`;

const InputWrapper = styled.View`
  background: #eee;
  padding: 10px 20px;
  border-radius: 20px;
  flex-direction: row;
  font-size: 20px;
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
      <Wrapper behavior="position">
        <InputWrapper>
          <Icon name="search" size={20} color="#bbb" />
          <StyledInput
            value={searchStr}
            placeholder="Search launches..."
            placeholderTextColor="#bbb"
            returnKeyType="search"
            clearButtonMode="always"
            onChangeText={searchStr => this.setState({ searchStr })}
            onSubmitEditing={() => this.props.launchSearch(searchStr)}
          />
        </InputWrapper>
      </Wrapper>
    );
  }
}

export default SearchBar;
