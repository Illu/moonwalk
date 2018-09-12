import ListScreen from './src/ListScreen';
import {FluidNavigator} from 'react-navigation-fluid-transitions';
import DetailsScreen from './src/DetailsScreen/DetailsScreen';

export default FluidNavigator({
  home: {
    screen: ListScreen,
    navigationOptions: {
      title: 'Home',
      header: null,
    }
  },
  details: {
    screen: DetailsScreen,
    navigationOptions: {
      title: 'Details',
      header: null,
    }
  },
});