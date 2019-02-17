import PushNotification from "react-native-push-notification";

export const configureRNPushNotifications = () => {
  PushNotification.configure({
    onRegister: token => {}
  });
};
