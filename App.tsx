import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import { AppState, StatusBar } from 'react-native';
import { eventEmitter, initialMode } from 'react-native-dark-mode';
import { ThemeProvider } from 'styled-components';

import { AppStateModel, LaunchesModel, NewsModel } from './src/models';
import generateNavigation from './src/Navigation';
import themes from './src/theme';

const launches = new LaunchesModel();
// const search = new SearchModel();
const news = new NewsModel();
const appState = new AppStateModel();

enum modes {
  dark = 'dark',
  light = 'light'
}

class App extends Component {
  state = {
    appState: AppState.currentState,
    theme: initialMode
  };

  componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);
    appState.setTheme(initialMode);
    eventEmitter.on('currentModeChanged', (theme) => {
      appState.setTheme(theme);
      this.setState({theme})
    })
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState: string) => {
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
    const currentTheme = this.state.theme;
    const Navigation = generateNavigation(themes[currentTheme])
        
    return (
      <Provider launches={launches} news={news} appState={appState}>
        <ThemeProvider theme={themes[currentTheme]}>
          <>
            <StatusBar barStyle="dark-content" />
            <Navigation theme={currentTheme} />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;