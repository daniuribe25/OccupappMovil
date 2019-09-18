import { createStackNavigator } from 'react-navigation';
import Home from '../screens/home/HomeScreen';
import AllServices from '../screens/home/AllServicesScreen';
import ServiceDetails from '../screens/home/ServiceDetailsScreen';
import Quote from '../screens/quote/QuoteScreen';
import Payment from '../screens/quote/PaymentScreen';

const homeNavigator = createStackNavigator({
  AllServices,
  Home,
  ServiceDetails,
  Quote,
  Payment,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    header: null,
  },
});

export default homeNavigator;
