module.exports = {
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/__tests__/**/*",
    "!<rootDir>/node_modules/",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(@react-native|react-native|react-native-code-push|react-native-inappbrowser-reborn)/)"
  ],
  coverageReporters: ["json", "lcov", "text-summary"],
  preset: "react-native",
  // moduleDirectories: ["<rootDir>/node_modules"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
