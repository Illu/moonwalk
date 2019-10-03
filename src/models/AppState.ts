import { action, observable } from "mobx";

export class AppStateModel {
  @observable
  theme = "light";

  @action
  setTheme = (theme: "light" | "dark") => {
    this.theme = theme;
  };
}
