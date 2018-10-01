import { connect } from 'react-redux';
import LaunchCalendarScreen from './LaunchCalendarScreen';
import {loadNextLaunches} from '../../Ducks/launches';

const mapStateToProps = state => {
  return {
    launches: state.launches
  }
}

const mapDispatchToProps = {
  loadNextLaunches, 
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchCalendarScreen)