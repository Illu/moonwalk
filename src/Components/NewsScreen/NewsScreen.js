import React, { Component } from "react";
import styled from "styled-components";
import ScreenTitle from "common/ScreenTitle";
import ScreenBackground from "common/ScreenBackground";
import { RefreshControl } from "react-native";
import { observer, inject } from "mobx-react";
import NewsCard from "components/NewsCard";
import ErrorCard from "components/ErrorCard";
import Loader from "common/Loader";
import { MONTHS_FULL, STATES } from "src/constants";

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

    if (news.state === STATES.ERROR) {
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
        {news.state === STATES.LOADING && news.numberOfArticles <= 0 ? (
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

export default NewsScreen;
