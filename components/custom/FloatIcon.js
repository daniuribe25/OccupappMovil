import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';

class FloatIcon extends Component {
  render() {
    return (
      <View>
        <Button
          transparent
          style={{ ...commonStyles.floatIconContainer, ...this.props.style }}
          onPress={() => this.props.onPress()}
        >
          <Icon
            type="font-awesome"
            name={this.props.icon}
            style={{ ...commonStyles.floatIcon, ...this.props.iconStyle }}
            color={this.props.color}
            size={25}
          />
        </Button>
      </View>
    );
  }
}

FloatIcon.defaultProps = {
  icon: 'arrow-circle-left',
  color: appColors.primary,
  style: {},
  iconStyle: {},
};

FloatIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.instanceOf({}),
  iconStyle: PropTypes.instanceOf({}),
};

export default FloatIcon;
