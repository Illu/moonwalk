/** @format */

import { AppRegistry } from "react-native";
import applyDecoratedDescriptor from "@babel/runtime/helpers/esm/applyDecoratedDescriptor";
import initializerDefineProperty from "@babel/runtime/helpers/esm/initializerDefineProperty";
import { name as appName } from "./app.json";

Object.assign(babelHelpers, {
  applyDecoratedDescriptor,
  initializerDefineProperty
});

const App = require("./App").default;
AppRegistry.registerComponent(appName, () => App);
