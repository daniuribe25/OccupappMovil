import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import homeNavigator from '../router/homeNavigator';
import Profile from '../screens/profile/Profile';
import { appColors } from '../styles/colors';

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
  Wallet: {
    screen: Profile,
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
