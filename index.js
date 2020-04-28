/**
 * @format
 */

import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import "mobx-react-lite/batchingForReactNative";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
