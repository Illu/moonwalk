import { connect } from 'react-redux';
import InfosScreen from './InfosScreen';
import {loadNextLaunches, setSelectedLaunch} from '../../Ducks/launches';
import {searchLaunches} from '../../Ducks/search';

const mapStateToProps = state => {
  return {
    searchResults: state.search,
  }
}

const mapDispatchToProps = {
  loadNextLaunches, 
  setSelectedLaunch,
  searchLaunches,
}

export default connect(mapStateToProps, mapDispatchToProps)(InfosScreen)