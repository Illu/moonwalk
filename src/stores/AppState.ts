import { decorate, observable, action } from "mobx"
import { createContext } from "react";
import AsyncStorage from '@react-native-community/async-storage';
import {Themes} from '../types';

class AppState {
  constructor() {
    this.initStore();
  }

  theme = Themes.automatic;

  setTheme = (newTheme: Themes) => {
    this.theme = newTheme;
    this.saveData();
  }

  initStore = async () => {
    try {
      const value = await AsyncStorage.getItem("@Moonwalk:settings");
      if (value !== null) {
        this.theme = JSON.parse(value);
      }
    } catch (error) { }
  }

  saveData = async () => {
    try {
      await AsyncStorage.setItem(
        "@Moonwalk:settings",
        JSON.stringify(this.theme)
      );
    } catch (error) { }
  }

}

decorate(AppState, {
  theme: observable,
  setTheme: action,
})

export default createContext(new AppState())