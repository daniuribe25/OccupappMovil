import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './HomeScreen';
import Profile from '../profile/Profile';
import { appColors } from '../../styles/colors';

const SettingsTabs = createAppContainer(createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="home"
          size={25}
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
          size={25}
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
          size={25}
          color={focused ? appColors.primary : appColors.grey}
        />
      ),
    },
  },
}, {
  tabBarOptions: { showLabel: false },
}));

export default class Tabs extends Component {
  render() {
    return (
      <SettingsTabs />
    );
  }
}
// Issue: the tab navigator needs to be wrapped inside a stack navigator
// export default createStackNavigator({ SettingsTabs }, { headerMode: 'none' });