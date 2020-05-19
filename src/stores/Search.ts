import { decorate, observable, action } from "mobx";
import { STATES, API_URL } from "../constants";
import { createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";

class Search {
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
    this.history.unshift(str);
    if (this.history.length > 4) {
      this.history.pop();
    }
    this.saveData();
  };

  searchLaunches = (str) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}launch/${str}`)
      .then((data) => data.json())
      .then((data) => {
        this.results = data.launches || [];
        this.totalResults = data.total;
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
