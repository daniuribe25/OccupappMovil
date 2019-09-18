import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import PropTypes from 'prop-types';
import { loaderStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';
import TextF from './TextF';

const Loader = ({ show, text }) => show && (
  <React.Fragment>
    {text ? (
      <View style={loaderStyles.textContainer}>
        <TextF style={loaderStyles.text}>{text}</TextF>
      </View>
    ) : null}
    <View style={loaderStyles.container} />
    <View style={loaderStyles.spinnerContainer}>
      <ActivityIndicator color={appColors.primary} size="large" />
      <StatusBar barStyle="default" />
    </View>
  </React.Fragment>
);


Loader.defaultProps = {
  text: null,
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
  text: PropTypes.string,
};

export default Loader;
