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
          style={commonStyles.backBtnIconContainer}
          onPress={() => this.props.onPress()}
        >
          <Icon
            type="font-awesome"
            name="arrow-circle-left"
            style={commonStyles.backBtnIcon}
            color={appColors.primary}
            size={40}
          />
        </Button>
      </View>
    );
  }
}

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default BackButton;
