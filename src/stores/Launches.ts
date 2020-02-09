import { decorate, observable } from "mobx"
import { STATES, API_URL } from '../constants';
import { createContext } from "react";

class Launches {
  state = STATES.IDLE;
  launches = [];

  loadNextLaunches = (numberOfLaunches = 5) => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}next/${numberOfLaunches}`)
      .then(data => data.json())
      .then(data => {
        this.launches = data.launches;
        this.state = STATES.SUCCESS;
      })
      .catch(err => {
        this.state = STATES.ERROR;
      });
  }
}

decorate(Launches, {
  state: observable,
  launches: observable,
})

export default createContext(new Launches())