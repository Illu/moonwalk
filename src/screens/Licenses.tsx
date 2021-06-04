import { useTheme } from "@react-navigation/native";
import React, { useEffect, useContext } from "react";
import { ScrollView, View } from "react-native";
import analytics from '@react-native-firebase/analytics';
import styled from "styled-components/native";

import Icon from "../common/Icon";
import Label from "../common/Label";
import { openLink } from "../helpers/OpenLink";
import LicensesData from "../Licenses.json";
import AppState from "../stores/AppState";

const ItemWrapper = styled.TouchableOpacity`
  border-bottom-width: 0.5px;
  flex-direction: row;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary};
  border-color: ${({ theme }) => theme.colors.uiAccent};
`;

const ItemTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.Text`
  font-size: 17px;
  margin: 0 20px 20px 20px;
  color: ${({ theme }) => theme.colors.text};
`;

const Row = styled.View`
  flex-direction: row;
`;

const Licenses = () => {

  const { colors } = useTheme();
  const appStateStore = useContext(AppState);

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
      <Title>
        Moonwalk is made possible thanks to the following Open-Source libraries
        and tools
      </Title>
      {LicensesData.map((lib, index) => (
        <ItemWrapper
          key={index}
          onPress={() =>
            openLink(
              `https://www.npmjs.com/package/${lib.name}`,
              appStateStore.browser
            )
          }
        >
          <View>
            <ItemTitle>{lib.name}</ItemTitle>
            <Row>
              <Label text={lib.licenseType} />
              <Label
                style={{ marginLeft: 5 }}
                text={lib.installedVersion}
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
