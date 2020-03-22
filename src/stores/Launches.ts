import { decorate, observable, action } from "mobx"
import { STATES, API_URL } from '../constants';
import { createContext } from "react";
import {Platform} from 'react-native';

class Launches {
  state = STATES.IDLE;
  launches = [];
  notifications = {
    enabled: false,
    delay: 10
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
      // await AsyncStorage.setItem(
      //   "@Moonwalk:notifications",
      //   JSON.stringify(this.notifications)
      // );
    } catch (error) {}
  };

  toggleNotifications = Platform.select({
    ios: async () => {
      this.notifications.enabled = !this.notifications.enabled;
      this.storeNotificationSettings();
      // if (this.notifications.enabled) {
      //   PushNotificationIOS.requestPermissions();
      // } else {
      //   PushNotificationIOS.cancelAllLocalNotifications();
      //   PushNotificationIOS.removeAllDeliveredNotifications();
      // }
    },
    android: () => {
      this.notifications.enabled = !this.notifications.enabled;
      this.storeNotificationSettings();
    }
  });

}

decorate(Launches, {
  state: observable,
  launches: observable,
  notifications: observable,
  toggleNotifications: action,
})

export default createContext(new Launches())