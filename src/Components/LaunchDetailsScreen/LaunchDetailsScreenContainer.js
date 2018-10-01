import { connect } from 'react-redux';
import LaunchDetailsScreen from './LaunchDetailsScreen';
import {loadNextLaunches, setSelectedLaunch} from '../../Ducks/launches';

const mapStateToProps = state => {
  return {
    launches: state.launches
  }
}

const mapDispatchToProps = {
  loadNextLaunches,
  setSelectedLaunch,
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchDetailsScreen)