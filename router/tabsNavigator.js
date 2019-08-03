import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import homeNavigator from './homeNavigator';
import profileNavigator from './profileNavigator';
import chatNavigator from './chatNavigator';
import { appColors } from '../styles/colors';
import TabBar from './components/TabBar';
import ServiceList from '../screens/services/ServiceListScreen';
import Wallet from '../screens/wallet/WalletScreen';

const TabsNavigator = createBottomTabNavigator({
  Home: {
    screen: homeNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="home"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
  ServiceList: {
    screen: ServiceList,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="hammer"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
  Wallet: {
    screen: Wallet,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="wallet"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
  Chat: {
    screen: chatNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <FontAwesome
          name="wechat"
          size={22}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
  Profile: {
    screen: profileNavigator,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="user"
          size={20}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
}, {
  tabBarComponent: props => <TabBar {...props} />,
  tabBarOptions: { showLabel: false },
});

export default TabsNavigator;
