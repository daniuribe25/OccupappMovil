import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import { commonStyles, loaderStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';

class Loader extends Component {
  render() {
    return this.props.show && (
      <View style={loaderStyles.container}>
        <View style={commonStyles.centerElement}>
          <ActivityIndicator color={appColors.primary} size="large" />
          <StatusBar barStyle="default" />
        </View>
      </View>
    );
  }
}

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Loader;
