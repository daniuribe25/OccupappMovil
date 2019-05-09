import { createStackNavigator } from 'react-navigation';
import Home from '../screens/home/HomeScreen';
import AllServices from '../screens/home/AllServices';
import ServiceDetails from '../screens/home/ServiceDetails';

const homeNavigator = createStackNavigator({
  AllServices,
  Home,
  ServiceDetails,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null,
  },
});

export default homeNavigator;
