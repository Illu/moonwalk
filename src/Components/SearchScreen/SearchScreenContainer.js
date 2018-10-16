import { connect } from "react-redux";
import SearchScreen from "./SearchScreen";
import { loadNextLaunches, setSelectedLaunch } from "../../Ducks/launches";
import { searchLaunches } from "../../Ducks/search";

const mapStateToProps = state => {
  return {
    searchResults: state.search
  };
};

const mapDispatchToProps = {
  loadNextLaunches,
  setSelectedLaunch,
  searchLaunches
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
