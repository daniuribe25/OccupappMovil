import React, { Component } from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
// import Icon from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Home from './HomeScreen';
// import appColors from '../../styles/colors';

const SettingsTabs = createAppContainer(createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <Icon
          name="home"
          size={25}
        />
      ),
    },
  },
  Wallet: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => (
        <Icon
          name="times"
          size={25}
        />
      ),
    },
  },
  // Memory: {
  //   screen: MemoryScreen,
  //   navigationOptions: {
  //     tabBarLabel: 'Wallet',
  //     tabBarIcon: () => (
  //       <Icon
  //         name="wallet"
  //         size={17}
  //         color={appColors.secondary}
  //       />
  //     ),
  //   },
  // },
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