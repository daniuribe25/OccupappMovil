import { createStackNavigator } from 'react-navigation';
import QuoteDetails from '../screens/quote/QuoteDetailsScreen';
import ServiceList from '../screens/services/ServiceListScreen';

const quoteNavigator = createStackNavigator({
  ServiceList,
  QuoteDetails,
}, {
  initialRouteName: 'ServiceList',
  defaultNavigationOptions: {
    header: null,
  },
});

export default quoteNavigator;
