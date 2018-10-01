import { connect } from 'react-redux';
import LaunchCalendarScreen from './LaunchCalendarScreen';
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

export default connect(mapStateToProps, mapDispatchToProps)(LaunchCalendarScreen)