import React, { Component } from 'react';
import { StatusBar, AppState } from "react-native";
import { Provider } from "mobx-react";
import { LaunchesModel } from './src/models'
import { ThemeProvider } from "styled-components";
import theme from "./src/theme";
import Navigation from './src/Navigation';

const launches = new LaunchesModel();
// const search = new SearchModel();
// const news = new NewsModel();

class App extends Component {
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (launches.numberOfLaunches > 0) {
        launches.scheduleNotification(launches.launches[0]);
      }
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <Provider launches={launches}>
        <ThemeProvider theme={theme}>
          <>
            <StatusBar barStyle="dark-content" />
            <Navigation />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;