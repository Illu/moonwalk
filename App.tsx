import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import { AppState, StatusBar } from 'react-native';
import { eventEmitter, initialMode } from 'react-native-dark-mode';
import { ThemeProvider } from 'styled-components';

import { LaunchesModel, NewsModel } from './src/models';
import generateNavigation from './src/Navigation';
import themes from './src/theme';

const launches = new LaunchesModel();
// const search = new SearchModel();
const news = new NewsModel();

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
    eventEmitter.on('currentModeChanged', (theme) => {
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
    const Navigation = generateNavigation(themes[this.state.theme])
    return (
      <Provider launches={launches} news={news}>
        <ThemeProvider theme={themes[this.state.theme]}>
          <>
            <StatusBar barStyle="dark-content" />
            <Navigation theme={this.state.theme} />
          </>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;