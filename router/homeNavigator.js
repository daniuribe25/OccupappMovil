import { createStackNavigator } from 'react-navigation';
import Home from '../screens/home/HomeScreen';
import MainForm from '../screens/home/MainForm';
import AllServices from '../screens/home/AllServicesScreen';
import ServiceDetails from '../screens/home/ServiceDetailsScreen';
import Quote from '../screens/quote/QuoteScreen';

const homeNavigator = createStackNavigator({
  AllServices,
  MainForm,
  ServiceDetails,
  Quote,
  Home,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null,
  },
});

export default homeNavigator;
