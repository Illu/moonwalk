import { observable, computed, action } from "mobx";
import { NEWS_API_URL } from "../../cfg";
import { STATES } from "src/constants";

export default class NewsModel {
  @observable
  articles = [];

  @observable
  state = STATES.IDLE;

  @computed
  get numberOfArticles() {
    return this.articles.length || 0;
  }

  @action
  getNews = (numberOfArticles = 12) => {
    this.state = STATES.LOADING;
    fetch(`${NEWS_API_URL}/articles?limit=${numberOfArticles}`)
      .then(data => data.json())
      .then(data => {
        this.articles = data || [];
        this.state = STATES.SUCCESS;
      })
      .catch(err => {
        this.state = STATES.ERROR;
      });
  };
}
