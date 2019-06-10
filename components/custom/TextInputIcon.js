/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';

class TextInputIcon extends Component {
  state = { style: commonStyles.textInput }

  onFocusTextInput = () => {
    this.setState({ style: { ...commonStyles.textInput, borderBottomColor: appColors.secondary } });
  };

  onBlurTextInput = () => {
    this.setState({ style: commonStyles.textInput });
  };

  render() {
    const { iconType, iconColor, iconName, iconSize, onFocus, value, secureTextEntry, keyboardType,
      onChangeText, placeholder, textPadding, language } = this.props;
    return (
      <View style={commonStyles.textInputContainer}>
        {iconName ? (
          <Icon
            style={commonStyles.textInputIcon}
            name={iconName}
            size={iconSize}
            color={iconColor}
            type={iconType}
          />
        ) : null}
        <TextInput
          ref={(c) => { if (this.props.ref) { this.props.ref(c); } }}
          style={{ ...this.state.style, paddingStart: textPadding }}
          placeholder={language[placeholder]}
          onChangeText={text => onChangeText(text)}
          onFocus={() => { onFocus ? onFocus() : this.onFocusTextInput(); }}
          onBlur={() => { this.onBlurTextInput(); }}
          value={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          maxLength={30}
        />
      </View>
    );
  }
}

TextInputIcon.defaultProps = {
  secureTextEntry: false,
  iconName: '',
  textPadding: 10,
  value: '',
  keyboardType: 'default',
  iconType: 'font-awesome',
  iconSize: 20,
  iconColor: appColors.grey,
};

TextInputIcon.propTypes = {
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  textPadding: PropTypes.number,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  onFocus: PropTypes.func,
  language: PropTypes.objectOf(PropTypes.instanceOf({})).isRequired,
  ref: PropTypes.func,
  iconType: PropTypes.string,
  iconColor: PropTypes.string,
  iconSize: PropTypes.number,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(TextInputIcon);
