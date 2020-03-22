import { decorate, observable, action } from "mobx"
import { STATES, API_URL } from '../constants';
import { createContext } from "react";
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios"

class Launches {
  state = STATES.IDLE;
  launches = [];
  notifications = {
    enabled: false,
    delay: 10
  };

  initApp = async () => {
    try {
      const value = await AsyncStorage.getItem("@Moonwalk:notifications");
      if (value !== null) {
        this.notifications = JSON.parse(value);
      }
    } catch (error) {}
  };

  loadNextLaunches = (numberOfLaunches = 10) => {
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

  loadMoreLaunches = numberOfLaunches => {
    this.state = STATES.LOADING;
    fetch(`${API_URL}next/${numberOfLaunches}?offset=${this.launches.length}`)
      .then(data => data.json())
      .then(data => {
        this.launches = this.launches.concat(data.launches);
        this.state = STATES.SUCCESS;
        console.log("XD")
      })
      .catch(err => {
        this.state = STATES.ERROR;
      });
  };

  storeNotificationSettings = async () => {
    try {
      await AsyncStorage.setItem(
        "@Moonwalk:notifications",
        JSON.stringify(this.notifications)
      );
    } catch (error) { }
  };

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

  changeNotificationDelay = (time: number) => {
    if (this.notifications.delay + time >= 0) {
      this.notifications.delay += time;
      this.storeNotificationSettings();
    }
  };

  scheduleNotification = Platform.select({
    ios: data => {
      if (this.notifications.enabled) {
        PushNotificationIOS.getScheduledLocalNotifications(
          plannedNotifications => {
            if (plannedNotifications.length > 0) {
              PushNotificationIOS.cancelAllLocalNotifications();
            }
            PushNotificationIOS.scheduleLocalNotification({
              fireDate: ((data.wsstamp - this.notifications.delay * 60) * 1000).toString(),
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

}

decorate(Launches, {
  state: observable,
  launches: observable,
  notifications: observable,
  toggleNotifications: action,
  changeNotificationDelay: action,
  scheduleNotification: action,
  initApp: action,
})

export default createContext(new Launches())