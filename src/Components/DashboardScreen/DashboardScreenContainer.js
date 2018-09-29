import { connect } from 'react-redux';
import DashboardScreen from './DashboardScreen';
import {loadLaunches} from '../../Ducks/launches';

const mapStateToProps = state => {
  return {
    launches: state.launches
  }
}

const mapDispatchToProps = {
  loadLaunches, 
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen)