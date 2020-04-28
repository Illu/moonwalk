import React, { useEffect, useContext } from "react";
import styled from "styled-components/native";
import { useTheme } from "@react-navigation/native";
import { ScrollView, View } from "react-native";
import LicensesData from "../Licenses.json";
import Icon from "../common/Icon";
import Label from "../common/Label";
import firebase from "react-native-firebase";
import { openLink } from "../helpers/OpenLink";
import AppState from "../stores/AppState";

const ItemWrapper = styled.TouchableOpacity`
  border-bottom-width: 0.5px;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
`;

const ItemTitle = styled.Text``;

const Title = styled.Text`
  font-size: 20px;
  margin: 0 0 10px 20px;
  font-weight: bold;
`;

const Row = styled.View`
  flex-direction: row;
`;

const Licenses = () => {
  useEffect(() => {
    firebase.analytics().setCurrentScreen("LICENSES");
  }, []);

  const { colors } = useTheme();
  const appStateStore = useContext(AppState);

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 40 }}>
      <Title style={{ color: colors.text }}>Open-Source Libraries used</Title>
      {LicensesData.map((lib, index) => (
        <ItemWrapper
          key={index}
          style={{
            backgroundColor: colors.secondary,
            borderColor: colors.uiAccent,
          }}
          onPress={() =>
            openLink(`https://www.npmjs.com/package/${lib.name}`, appStateStore.browser)
          }
        >
          <View>
            <ItemTitle style={{ color: colors.text }}>{lib.name}</ItemTitle>
            <Row>
              <Label text={lib.licenseType} />
              <Label
                style={{ marginLeft: 5 }}
                text={lib.comment}
                color="#2dcd55"
              />
            </Row>
          </View>
          <Icon name="ChevronRight" color={colors.uiAccent} />
        </ItemWrapper>
      ))}
    </ScrollView>
  );
};

export default Licenses;
