import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { appGlobalStyles } from '../../constants/appConstants';

const TextF = props => (
  <Text {...props} style={{ ...props.style, fontFamily: appGlobalStyles.FONT_FAMILY }}>
    {props.children}
  </Text>
);

TextF.defaultProps = {
  style: {},
};

TextF.propTypes = {
  style: PropTypes.shape({}),
  children: PropTypes.shape({}).isRequired,
};

export default TextF;
