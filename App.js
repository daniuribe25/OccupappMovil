import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import RootNavigator from './router/rootNavigator';

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
