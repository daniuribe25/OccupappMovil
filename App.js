import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import Welcome from './screens/session/WelcomeScreen';
import LoginRegister from './screens/session/LoginRegisterScreen';
import RegisterInfo from './screens/session/RegisterInfoScreen';
import Tabs from './screens/home/index';

const Navigation = createAppContainer(createStackNavigator({
  Welcome,
  LoginRegister,
  RegisterInfo,
  Tabs,
},
{
  initialRouteName: 'Welcome',
  defaultNavigationOptions: {
    header: null,
  },
}));

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
