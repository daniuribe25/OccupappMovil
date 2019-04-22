import React, { Component } from 'react';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './redux/store';

import LoadingAuth from './screens/session/LoadingAuthScreen';
import Welcome from './screens/session/WelcomeScreen';
import Tabs from './screens/home/index';
import LoginRegister from './screens/session/LoginRegisterScreen';
import RegisterInfo from './screens/session/RegisterInfoScreen';

const WelcomeStack = createStackNavigator({
  Welcome,
  LoginRegister,
  RegisterInfo,
}, {
  initialRouteName: 'Welcome',
  defaultNavigationOptions: {
    header: null,
  },
});

const Navigation = createAppContainer(createSwitchNavigator(
  {
    LoadingAuth,
    WelcomeStack,
    Tabs,
  },
  {
    initialRouteName: 'LoadingAuth',
  },
));

// const Navigation = createAppContainer(createStackNavigator({
//   Welcome,
//   LoginRegister,
//   RegisterInfo,
//   Tabs,
// },
// {
//   initialRouteName: 'Welcome',
//   defaultNavigationOptions: {
//     header: null,
//   },
// }));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
