import { decorate, observable, action } from "mobx";
import { STATES, API_URL } from "../constants";
import { createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export class Search {
  state = STATES.IDLE;
  results = [];
  totalResults = "";
  history = [];

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

  searchLaunches = (str) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launch?search=${str}`)
      .then((data) => data.json())
      .then((data) => {
        this.results = data.results || [];
        this.totalResults = data.count;
        this.state = STATES.SUCCESS;
        this.addHistoryItem(str);
      })
      .catch((err) => {
        this.state = STATES.ERROR;
      });
  };

  clearHistory = () => {
    this.history = [];
    this.saveData();
  };

  clearResults = () => {
    this.results = [];
    this.state = STATES.IDLE;
  };
}

decorate(Search, {
  state: observable,
  results: observable,
  totalResults: observable,
  history: observable,
  clearResults: action,
});

export default createContext(new Search());
