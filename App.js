import React, { Component } from 'react';
import { Provider } from 'react-redux';
import OneSignal from 'react-native-onesignal';
import store from './redux/store';
import RootNavigator from './router/rootNavigator';

export default class App extends Component {
  constructor(properties) {
    super(properties);
    OneSignal.init('368c949f-f2ef-4905-8c78-4040697f38cf');

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.inFocusDisplaying(2);
    OneSignal.configure(); // triggers the ids event
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived = (notification) => {
    console.log('Notification received: ', notification);
  }

  onOpened = (openResult) => {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds = (device) => {
    console.log('Device info: ', device);
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
