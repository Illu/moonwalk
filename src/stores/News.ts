import { decorate, observable } from "mobx";
import { STATES, NEWS_API_URL } from "../constants";
import { createContext } from "react";

class News {
  state = STATES.IDLE;
  news = [];

  loadArticles = () => {
    this.state = STATES.LOADING;
    fetch(`${NEWS_API_URL}/articles`)
      .then((data) => data.json())
      .then((data) => {
        this.news = data.docs;
        this.state = STATES.SUCCESS;
      })
      .catch((err) => {
        this.state = STATES.ERROR;
      });
  };
}

decorate(News, {
  state: observable,
  news: observable,
});

export default createContext(new News());
