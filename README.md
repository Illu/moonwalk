# [Moonwalk](https://itunes.apple.com/us/app/moonwalk-rocket-launches/id1439376174)

[![iTunes App Store](https://img.shields.io/itunes/v/1439376174.svg?style=flat-square)](https://itunes.apple.com/us/app/moonwalk-rocket-launches/id1439376174)
![license: MIT](https://img.shields.io/github/license/illu/moonwalk?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![tests](https://github.com/Illu/moonwalk/workflows/tests/badge.svg)

A simple way to stay up to date with upcoming space launches, built with [React-Native](https://github.com/facebook/react-native), using the [Launch Library 2](https://thespacedevs.com/) and the [Spaceflight News API](https://spaceflightnewsapi.net/).

## Preview

<p align="center">
  <img src="https://maximenory.com/public/mwpreview2.png" />
</p>

## Stack

[React-Native](https://github.com/facebook/react-native)

[React-Navigation](https://reactnavigation.org/)

[MobX](https://mobx.js.org/)

[TypeScript](https://www.typescriptlang.org/)

[Styled-Components](https://www.styled-components.com/)

## Installation

If you want to test the app on a simulator running locally, follow these instructions:

First, you'll need to create or import a `GoogleService-Info.plist` file in the `ios` folder. Next, use the following commands:

```bash
$ cd moonwalk

$ yarn

$ cd ios && pod install && cd ..

$ yarn build-ios

$ react-native run-ios
```

### Android

I don't plan to release an Android version of Moonwalk at the current time.

<!-- Although not deployed on the Google Play Store yet, the app is able to run on Android devices. To run the app, simply use the `react-native run-android` command. (This is an ongoing feature, expect some layout issues). -->

## Contribute

If you find a bug, feel free to open an issue or submit a pull request.

New ideas are always welcome, if you have an idea to change or add a feature, let me know by opening an issue or messaging me on [Twitter](https://twitter.com/MaximeNory).

## Standalone Build

```bash
$ yarn build-ios
```

To see the assets (Images) in your build, open the XCode project, right click on the moonwalk target -> "Add files to Moonwalk" -> select the asset folder, and make sure the 'create folder references' checkbox is ticked.

You should be able to build the app with ⌘(cmd)+B.

## Licence

MIT License

See [LICENSE](LICENSE)

<p align="center">
  <img width="200" src="https://maximenory.com/public/mwlogo.png" />
</p>
