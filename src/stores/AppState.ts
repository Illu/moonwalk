import { decorate, observable, action } from "mobx";
import { createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Themes, Browsers } from "../types";

class AppState {
  constructor() {
    this.initStore();
  }

  theme = Themes.automatic;
  browser = Browsers.inApp;
  appIcon = "Default";

  setTheme = (newTheme: Themes) => {
    this.theme = newTheme;
    this.saveData();
  };

  setAppIcon = (newIcon: string) => {
    this.appIcon = newIcon;
    this.saveData();
  };

  setBrowser = (browser: Browsers) => {
    this.browser = browser;
  };

  initStore = async () => {
    try {
      const value = await AsyncStorage.getItem("@Moonwalk:settings");
      if (value !== null) {
        const data = JSON.parse(value);
        this.theme = data.theme;
        this.appIcon = data.appIcon || "Default";
        this.browser = data.browser || Browsers.inApp;
      }
    } catch (error) {}
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        "@Moonwalk:settings",
        JSON.stringify({
          theme: this.theme,
          appIcon: this.appIcon,
          browser: this.browser,
        })
      );
    } catch (error) {}
  };
}

decorate(AppState, {
  theme: observable,
  browser: observable,
  appIcon: observable,
  setTheme: action,
  setAppIcon: action,
});

export default createContext(new AppState());
