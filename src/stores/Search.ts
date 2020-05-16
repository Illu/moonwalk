import { decorate, observable } from "mobx";
import { STATES, API_URL, NEWS_API_URL } from "../constants";
import { createContext } from "react";

class Search {
  state = STATES.IDLE;
  results = [];
  totalResults = "";

  searchLaunches = (str) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launch/${str}`)
      .then((data) => data.json())
      .then((data) => {
        this.results = data.launches || [];
        this.totalResults = data.total;
        this.state = STATES.SUCCESS;
      })
      .catch((err) => {
        this.state = STATES.ERROR;
      });
  };
}

decorate(Search, {
  state: observable,
  results: observable,
  totalResults: observable,
});

export default createContext(new Search());
