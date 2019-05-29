import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { NotificationsAndroid } from 'react-native-notifications';
import store from './redux/store';
import RootNavigator from './router/rootNavigator';

export default class App extends Component {
  constructor() {
    super();
    NotificationsAndroid.setRegistrationTokenUpdateListener((deviceToken) => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log('Push-notifications registered!', deviceToken);
    });

    NotificationsAndroid.setNotificationReceivedListener((notification) => {
      console.log('Notification received on device in background or foreground', notification.getData());
    });
    NotificationsAndroid.setNotificationReceivedInForegroundListener((notification) => {
      console.log('Notification received on device in foreground', notification.getData());
    });
    NotificationsAndroid.setNotificationOpenedListener((notification) => {
      console.log('Notification opened by device user', notification.getData());
    });
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
