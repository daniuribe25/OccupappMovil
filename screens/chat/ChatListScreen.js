/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import Text from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class ChatList extends Component {
  state = {
    showLoader: false,
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => this.fetchUserPayments(),
    );
  }

  render() {
    return (
      <Text>Daniel</Text>
    );
  }
}

ChatList.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(ChatList);
