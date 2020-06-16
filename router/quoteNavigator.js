import { createStackNavigator } from 'react-navigation';
import QuoteDetails from '../screens/quote/QuoteDetailsScreen';
import ServiceList from '../screens/services/ServiceListScreen';
import Payment from '../screens/quote/PaymentScreen';

const quoteNavigator = createStackNavigator({
  ServiceList,
  QuoteDetails,
  Payment,
}, {
  initialRouteName: 'ServiceList',
  defaultNavigationOptions: {
    header: null,
  },
});

export default quoteNavigator;
