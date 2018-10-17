import { observable, computed, action } from "mobx";
import { API_URL } from "../../cfg";

export default class LaunchesModel {
  @observable
  launches = [];

  @observable
  nextLaunch = [];

  @observable
  state = "idle";

  @observable
  notifications = {
    enabled: false,
    delay: 0
  };

  @computed
  get upcomingLaunch() {
    return this.launches.length > 0 && this.launches[0];
  }

  @computed
  get numberOfLaunches() {
    return this.launches.length || 0;
  }

  @action
  toggleNotifications = () => {
    this.notifications.enabled = !this.notifications.enabled;
  };

  @action
  loadNextLaunches = numberOfLaunches => {
    this.state = "loading";
    fetch(`${API_URL}next/${numberOfLaunches}`)
      .then(data => data.json())
      .then(data => {
        this.launches = data.launches;
        this.state = "success";
      })
      .catch(err => {
        this.state = "error";
      });
  };

  @action
  loadMoreLaunches = numberOfLaunches => {
    this.state = "loading";
    fetch(`${API_URL}next/${numberOfLaunches}?offset=${this.launches.length}`)
      .then(data => data.json())
      .then(data => {
        this.launches = [...this.launches, ...data.launches];
        this.state = "success";
      })
      .catch(err => {
        this.state = "error";
      });
  };
}
