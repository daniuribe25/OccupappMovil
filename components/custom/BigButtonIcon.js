import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';

class BigButtonIcon extends Component {
  render() {
    return (
      <View style={commonStyles.btnContainer}>
        <Button
          style={{ ...commonStyles.btn, ...this.props.btnStyle }}
          iconRight
          onPress={() => this.props.onPress()}
        >
          {this.props.text ? (
            <Text style={commonStyles.btnText}>{this.props.text}</Text>
          ) : null}
          {this.props.iconName ? (
            <Icon name={this.props.iconName} color={appColors.white} />
          ) : null}
        </Button>
      </View>
    );
  }
}

BigButtonIcon.defaultProps = {
  text: '',
  iconName: undefined,
  btnStyle: {},
};

BigButtonIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  text: PropTypes.string,
  btnStyle: PropTypes.objectOf(PropTypes.any),
};

export default BigButtonIcon;
