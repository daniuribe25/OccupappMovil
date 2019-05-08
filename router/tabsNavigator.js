import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from '../screens/home/HomeScreen';
import Profile from '../screens/profile/Profile';
import { appColors } from '../styles/colors';

const TabsNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
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
  Wallet: {
    screen: Home,
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
  Profile: {
    screen: Profile,
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
  tabBarOptions: { showLabel: false },
});

export default TabsNavigator;
