import { connect } from 'react-redux';
import DashboardScreen from './DashboardScreen';
import {loadNextLaunches} from '../../Ducks/launches';

const mapStateToProps = state => {
  return {
    launches: state.launches
  }
}

const mapDispatchToProps = {
  loadNextLaunches, 
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)