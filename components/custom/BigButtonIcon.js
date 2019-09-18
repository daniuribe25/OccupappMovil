import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'native-base';
// import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';
import TextF from './TextF';

class BigButtonIcon extends Component {
  render() {
    return (
      <View style={{ ...commonStyles.btnContainer, ...this.props.btnContainerStyle }}>
        <Button
          style={{ ...commonStyles.btn, ...this.props.btnStyle }}
          iconRight
          onPress={() => this.props.onPress()}
        >
          {this.props.text ? (
            <TextF style={commonStyles.btnText}>{this.props.text}</TextF>
          ) : null}
          {this.props.iconName ? (
            <Icon name={this.props.iconName} color={appColors.white} type={this.props.iconType} />
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
  iconType: 'Ionicons',
  btnContainerStyle: {},
};

BigButtonIcon.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  text: PropTypes.string,
  btnStyle: PropTypes.objectOf(PropTypes.any),
  btnContainerStyle: PropTypes.objectOf(PropTypes.any),
  iconType: PropTypes.string,
};

export default BigButtonIcon;
