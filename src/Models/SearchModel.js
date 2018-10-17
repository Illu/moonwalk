import { observable, computed, action } from "mobx";
import { API_URL } from "../../cfg";

export default class SearchModel {
  @observable
  results = [];
  @observable
  state = "idle";
  @observable
  totalResults = "ASDASD";

  @action
  searchLaunches = str => {
    this.state = "loading";
    fetch(`${API_URL}/${str}`)
      .then(data => data.json())
      .then(data => {
        this.results = data.launches || [];
        this.totalResults = data.total;
        this.state = "success";
      })
      .catch(err => {
        this.state = "error";
      });
  };
}
