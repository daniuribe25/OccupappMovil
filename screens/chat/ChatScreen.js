/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class Chat extends Component {
  state = {
    showLoader: false,
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => {},
    );
  }

  render() {
    return (
      <View>
        <Text>Daniel</Text>
      </View>
    );
  }
}

Chat.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(Chat);
