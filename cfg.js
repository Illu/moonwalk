import PushNotification from "react-native-push-notification";

export const API_URL = "https://launchlibrary.net/1.4/launch/";

export const configureRNPushNotifications = () => {
  PushNotification.configure({
    onRegister: token => {}
  });
};
