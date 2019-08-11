import React, { Component } from "react";
import styled from "styled-components/native";
import { RefreshControl } from "react-native";
import { observer, inject } from "mobx-react";
import {NewsCard} from "../components";
import { STATES, MONTHS_FULL } from "../constants";
import { ScreenTitle } from "../common";

const Wrapper = styled.View`
  padding: 40px 0 0 0;
  flex: 1;
`;

const ScrollWrapper = styled.ScrollView`
  margin-top: 15px;
`;

const DateTitle = styled.Text`
  color: white;
  font-weight: bold;
  margin: 10px;
  font-size: 22px;
`;

@inject("news")
@observer
export class News extends Component {
  componentDidMount() {
    this.loadNews();
  }

  loadNews = () => {
    this.props.news.getNews();
  };

  render() {
    const { news } = this.props;
    const dateTS = new Date();
    const date = `${MONTHS_FULL[dateTS.getMonth()]} ${dateTS.getDate()}`;

    if (news.state === STATES.ERROR) {
      return (
        <Wrapper>
          <ScreenTitle title="News" />
          <ScreenTitle title="ERROR" />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <ScreenTitle title="News" />
        {news.state === STATES.LOADING && news.numberOfArticles <= 0 ? (
          <ScreenTitle title="LOADING" />
        ) : (
          <ScrollWrapper
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
            refreshControl={
              <RefreshControl
                refreshing={news.state === STATES.LOADING}
                onRefresh={this.loadNews}
                tintColor="#fff"
              />
            }
          >
            <DateTitle>{date}</DateTitle>
            {news.articles.map((item, index) => (
              <NewsCard
                key={item._id}
                data={item}
                fullWidth={index % 3 === 0}
              />
            ))}
          </ScrollWrapper>
        )}
      </Wrapper>
    );
  }
}