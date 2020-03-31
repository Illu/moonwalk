import { decorate, observable, action } from "mobx";
import { createContext } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Themes } from "../types";

class AppState {
  constructor() {
    this.initStore();
  }

  theme = Themes.automatic;
  appIcon = "Default";

  setTheme = (newTheme: Themes) => {
    this.theme = newTheme;
    this.saveData();
  };

  setAppIcon = (newIcon: string) => {
    this.appIcon = newIcon;
    this.saveData();
  };

  initStore = async () => {
    try {
      const value = await AsyncStorage.getItem("@Moonwalk:settings");
      if (value !== null) {
        const data = JSON.parse(value);
        this.theme = data.theme;
        this.appIcon = data.appIcon || "Default";
      }
    } catch (error) {}
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        "@Moonwalk:settings",
        JSON.stringify({ theme: this.theme, appIcon: this.appIcon })
      );
    } catch (error) {}
  };
}

decorate(AppState, {
  theme: observable,
  appIcon: observable,
  setTheme: action,
  setAppIcon: action,
});

export default createContext(new AppState());
