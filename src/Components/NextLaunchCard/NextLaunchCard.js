import React from "react";
import styled from "styled-components";
import LinearGradient from "react-native-linear-gradient";
import { View, TouchableOpacity } from "react-native";
import PushableWrapper from "common/PushableWrapper";

const Wrapper = styled(LinearGradient)`
  border-radius: 10px;
  flex: 1;
  margin: 10px 25px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: ${({ large }) => (large ? 18 : 14)}px;
  align-self: flex-end;
`;

const CompanyTitle = styled(Title)`
  align-self: flex-start;
  font-size: 24px;
`;

const BackgroundImage = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0.2;
`;

const ContentWrapper = styled.View`
  padding: 20px;
  flex: 1;
  justify-content: space-between;
`;

export default ({ data, navigateToDetails, scheduleNotification }) => {
  scheduleNotification(data);
  return (
    <PushableWrapper style={{ flex: 1 }} onPress={navigateToDetails}>
      <Wrapper
        colors={["#ffb39d", "#ff43bb"]}
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
      >
        <BackgroundImage source={{ uri: data.rocket.imageURL }} />
        <ContentWrapper>
          <View>
            <CompanyTitle>{data.lsp.name}</CompanyTitle>
          </View>
          <View>
            <Title large adjustsFontSizeToFit numberOfLines={1}>
              {data.name}
            </Title>
            <Title>{data.windowstart}</Title>
          </View>
        </ContentWrapper>
      </Wrapper>
    </PushableWrapper>
  );
};
