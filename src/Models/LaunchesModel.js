import { observable, computed, action } from "mobx";
import { PushNotificationIOS, AsyncStorage } from "react-native";
import { API_URL } from "../../cfg";

storeData = async data => {
  try {
    await AsyncStorage.setItem("@Moonwalk:notifications", JSON.stringify(data));
  } catch (error) {}
};

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
    delay: 10
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
  initApp = async () => {
    try {
      const value = await AsyncStorage.getItem("@Moonwalk:notifications");
      if (value !== null) {
        this.notifications = JSON.parse(value);
      }
    } catch (error) {}
  };

  storeNotificationSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "@Moonwalk:notifications",
        JSON.stringify(this.notifications)
      );
    } catch (error) {}
  };

  @action
  changeNotificationDelay = time => {
    if (this.notifications.delay + time >= 0) {
      this.notifications.delay += time;
      this.storeNotificationSettings();
    }
  };

  @action
  toggleNotifications = async () => {
    this.notifications.enabled = !this.notifications.enabled;
    this.storeNotificationSettings();
    if (this.notifications.enabled) {
      PushNotificationIOS.requestPermissions();
    } else {
      PushNotificationIOS.cancelAllLocalNotifications();
      PushNotificationIOS.removeAllDeliveredNotifications();
    }
  };

  @action
  scheduleNotification = data => {
    if (this.notifications.enabled) {
      PushNotificationIOS.getScheduledLocalNotifications(
        plannedNotifications => {
          if (plannedNotifications.length > 0) {
            PushNotificationIOS.cancelAllLocalNotifications();
          }
          PushNotificationIOS.scheduleLocalNotification({
            fireDate: (data.wsstamp - 5 * 60) * 1000,
            alertBody: `🚀 ${data.name} will launch in just ${
              this.notifications.delay
            } minutes!`
          });
        }
      );
    }
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
