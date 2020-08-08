import AsyncStorage from "@react-native-community/async-storage";
import { decorate, observable, action } from "mobx";
import { createContext } from "react";

import { STATES, API_URL, NEWS_API_URL } from "../constants";

export class Search {
  state: STATES = STATES.IDLE;
  launchResults = [];
  newsResults = [];
  totalResults: string = "";
  history: string[] = [];

  initStore = async () => {
    try {
      const value = await AsyncStorage.getItem("@Moonwalk:search");
      if (value !== null) {
        const data = JSON.parse(value);
        this.history = data.history;
      }
    } catch (error) {}
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        "@Moonwalk:search",
        JSON.stringify({
          history: this.history,
        })
      );
    } catch (error) {}
  };

  addHistoryItem = (str) => {
    if (this.history.indexOf(str) < 0) {
      this.history.unshift(str);
      if (this.history.length > 4) {
        this.history.pop();
      }
      this.saveData();
    }
  };

  searchLaunches = async (str) => {
    this.state = STATES.LOADING;

    try {
      const results = await Promise.all([
        fetch(`${API_URL}launch?search=${str}`),
        fetch(`${NEWS_API_URL}/articles?search=${str}`),
      ]);
      const launchResults = await results[0].json();
      const newsResults = await results[1].json();

      this.launchResults = launchResults.results || [];
      this.newsResults = newsResults.docs || [];
      this.addHistoryItem(str);

      this.state = STATES.SUCCESS;
      this.totalResults = `${launchResults.results.length + newsResults.docs.length}`;
    } catch (err) {
      this.state = STATES.ERROR;
    }
  };

  clearHistory = () => {
    this.history = [];
    this.saveData();
  };

  clearResults = () => {
    this.newsResults = [];
    this.launchResults = [];
    this.state = STATES.IDLE;
  };
}

decorate(Search, {
  state: observable,
  launchResults: observable,
  newsResults: observable,
  totalResults: observable,
  history: observable,
  clearResults: action,
});

export default createContext(new Search());
