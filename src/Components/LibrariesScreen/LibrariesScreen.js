import React, { Component } from "react";
import styled from "styled-components";
import { FlatList, Linking } from "react-native";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import ScreenBackground from "common/ScreenBackground";
import licenses from "src/licenses";
import HeaderBack from "common/HeaderBack";
import Button from "common/Button";

const Wrapper = styled(ScreenBackground)`
  flex: 1;
`;

const ItemWrapper = styled.TouchableOpacity`
  padding: 20px;
  border-radius: 8px;
`;

const ItemTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: white;
`;

const LicenseName = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: white;
  margin-left: 14px;
`;

const BottomWrapper = styled.View`
  border-left-width: 3px;
  border-left-color: white;
  margin: 0 15px;
  padding: 20px 15px;
  flex-direction: row;
`;

const ListItem = ({ item }) => {
  const itemName = Object.keys(item)[0];
  const data = item[itemName];
  return (
    <ItemWrapper onPress={() => Linking.openURL(data.licenseUrl)}>
      <Button
        title={itemName}
        type="primary"
        fontSize={15}
        icon="github"
        onPress={() => Linking.openURL(data.licenseUrl)}
      />
      <BottomWrapper>
        <Icon name="book" size={22} color="#fff" />
        <LicenseName>{data.licenses}</LicenseName>
      </BottomWrapper>
    </ItemWrapper>
  );
};

export default class extends Component {
  static navigationOptions = {
    title: "Licenses",
    headerStyle: {
      backgroundColor: "#222437"
    },
    header: null,
    headerTintColor: "#fff"
  };

  render() {
    return (
      <Wrapper>
        <SafeAreaView style={{ flex: 1 }}>
          <HeaderBack
            ScreenTitle="Licenses"
            navigateBack={() => this.props.navigation.goBack()}
          />
          <FlatList
            data={licenses}
            renderItem={ListItem}
            keyExtractor={(_, i) => i.toString()}
          />
        </SafeAreaView>
      </Wrapper>
    );
  }
}
