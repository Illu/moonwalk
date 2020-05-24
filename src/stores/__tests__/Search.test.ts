import { Search } from "../Search";

jest.mock("@react-native-community/async-storage", () => "");
jest.useFakeTimers();

const searchInstance = new Search();

describe("Search Store", () => {
  it("is initialized with an empty search history", () => {
    expect(searchInstance.history).toStrictEqual([]);
  });

  it("can search and add an item to the search history", () => {
    searchInstance.addHistoryItem("$_TEST_SEARCH_1_$");
    expect(searchInstance.history).toStrictEqual(["$_TEST_SEARCH_1_$"]);
  });

  it("won't add duplicate items to the search history", () => {
    searchInstance.addHistoryItem("$_TEST_SEARCH_1_$");
    searchInstance.addHistoryItem("$_TEST_SEARCH_1_$");
    searchInstance.addHistoryItem("$_TEST_SEARCH_2_$");
    expect(searchInstance.history).toStrictEqual([
      "$_TEST_SEARCH_2_$",
      "$_TEST_SEARCH_1_$",
    ]);
  });
});
