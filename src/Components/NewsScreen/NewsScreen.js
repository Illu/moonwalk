import React, { Component } from "react";
import styled from "styled-components";
import ScreenTitle from "../../Common/ScreenTitle";
import ScreenBackground from "../../Common/ScreenBackground";
import { RefreshControl } from "react-native";
import { observer, inject } from "mobx-react";
import NewsCard from "../NewsCard/NewsCard";
import ErrorCard from "../ErrorCard";
import Loader from "../../Common/Loader";
import { MONTHS_FULL } from "../../constants";

const Wrapper = styled(ScreenBackground)`
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
class NewsScreen extends Component {
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

    if (news.state === "error") {
      return (
        <Wrapper>
          <ScreenTitle title="News" />
          <ErrorCard onPress={this.loadNews} />
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <ScreenTitle title="News" />
        {news.state === "loading" && news.numberOfArticles <= 0 ? (
          <Loader />
        ) : (
          <ScrollWrapper
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-around"
            }}
            refreshControl={
              <RefreshControl
                refreshing={news.state === "loading"}
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

export default NewsScreen;
