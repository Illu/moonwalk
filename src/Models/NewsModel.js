import { observable, computed, action } from "mobx";
import { NEWS_API_URL } from "../../cfg";

export default class NewsModel {
  @observable
  articles = [];

  @observable
  state = "idle"; // @TODO: use constant instead of strings

  @computed
  get numberOfArticles() {
    return this.articles.length || 0;
  }

  @action
  getNews = (numberOfArticles = 12) => {
    this.state = "loading";
    fetch(`${NEWS_API_URL}/articles?limit=${numberOfArticles}`)
      .then(data => data.json())
      .then(data => {
        this.articles = data || [];
        this.state = "success";
      })
      .catch(err => {
        this.state = "error";
      });
  };
}
