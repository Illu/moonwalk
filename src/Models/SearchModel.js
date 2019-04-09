import { observable, action } from "mobx";
import { API_URL } from "../../cfg";
import { STATES } from "src/constants";

export default class SearchModel {
  @observable
  results = [];

  @observable
  state = STATES.IDLE;

  @observable
  totalResults = "";

  @action
  searchLaunches = str => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}/${str}`)
      .then(data => data.json())
      .then(data => {
        this.results = data.launches || [];
        this.totalResults = data.total;
        this.state = STATES.SUCCESS;
      })
      .catch(err => {
        this.state = STATES.ERROR;
      });
  };
}
