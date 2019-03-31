import { observable, computed, action } from "mobx";
import { PushNotificationIOS, AsyncStorage, Platform } from "react-native";
import { API_URL } from "../../cfg";
import PushNotification from "react-native-push-notification";
import { STATES } from "src/constants";

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
  state = STATES.IDLE;

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
  toggleNotifications = Platform.select({
    ios: async () => {
      this.notifications.enabled = !this.notifications.enabled;
      this.storeNotificationSettings();
      if (this.notifications.enabled) {
        PushNotificationIOS.requestPermissions();
      } else {
        PushNotificationIOS.cancelAllLocalNotifications();
        PushNotificationIOS.removeAllDeliveredNotifications();
      }
    },
    android: () => {
      this.notifications.enabled = !this.notifications.enabled;
      this.storeNotificationSettings();
    }
  });

  @action
  scheduleNotification = Platform.select({
    ios: data => {
      if (this.notifications.enabled) {
        PushNotificationIOS.getScheduledLocalNotifications(
          plannedNotifications => {
            if (plannedNotifications.length > 0) {
              PushNotificationIOS.cancelAllLocalNotifications();
            }
            PushNotificationIOS.scheduleLocalNotification({
              fireDate: (data.wsstamp - this.notifications.delay * 60) * 1000,
              alertBody: `🚀 ${data.name} will launch in just ${
                this.notifications.delay
              } minutes!`
            });
          }
        );
      }
    },
    android: data => {
      if (this.notifications.enabled) {
        PushNotification.cancelAllLocalNotifications();
        PushNotification.localNotificationSchedule({
          date: new Date(data.isostart),
          message: `🚀 ${data.name} will launch in just ${
            this.notifications.delay
          } minutes!`
        });
      }
    }
  });

  @action
  loadNextLaunches = numberOfLaunches => {
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
  };

  @action
  loadMoreLaunches = numberOfLaunches => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}next/${numberOfLaunches}?offset=${this.launches.length}`)
      .then(data => data.json())
      .then(data => {
        this.launches = this.launches.concat(data.launches);
        this.state = STATES.SUCCESS;
      })
      .catch(err => {
        this.state = STATES.ERROR;
      });
  };
}
