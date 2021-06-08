import { makeAutoObservable } from "mobx";
import { createContext } from "react";

import { STATES, API_URL } from "../constants";

class Events {
  state = STATES.IDLE;
  events = [];
  error = null;

  constructor() {
    makeAutoObservable(this)
  }

  loadEvents = () => {
    this.state = STATES.LOADING;
    this.error = null;
    fetch(`${API_URL}event/upcoming?limit=10`)
      .then((data) => data.json())
      .then((data) => {
        console.log("DATA", data)
        this.events = data.results;
        this.state = STATES.SUCCESS;
      })
      .catch((err) => {
        this.state = STATES.ERROR;
        if (err.detail) {
          this.error = err.detail;
        }
        console.log(err)
      });
  };
}

export default createContext(new Events());
