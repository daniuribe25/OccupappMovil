import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'native-base';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';

class BackButton extends Component {
  render() {
    return (
      <View>
        <Button
          transparent
          style={{ ...commonStyles.backBtnIconContainer, ...this.props.style }}
          onPress={() => this.props.onPress()}
        >
          <Icon
            type={this.props.type}
            name={this.props.icon}
            style={commonStyles.backBtnIcon}
            color={this.props.color}
            size={25}
          />
        </Button>
      </View>
    );
  }
}

BackButton.defaultProps = {
  icon: 'arrow-circle-left',
  type: 'font-awesome',
  color: appColors.primary,
  style: {},
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string,
  color: PropTypes.string,
  style: PropTypes.instanceOf({}),
  type: PropTypes.string,
};

export default BackButton;
