import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import { Icon } from 'native-base';
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
    return (
      <View style={commonStyles.textInputContainer}>
        {this.props.iconName ? (
          <Icon
            style={commonStyles.textInputIcon}
            name={this.props.iconName}
            size={20}
            color="red"
          />
        ) : null}
        <TextInput
          style={{ ...this.state.style, paddingStart: this.props.textPadding }}
          placeholder={this.props.language[this.props.placeholder]}
          onChangeText={text => this.props.onChangeText(text)}
          onFocus={() => { this.onFocusTextInput(); }}
          onBlur={() => { this.onBlurTextInput(); }}
          value={this.props.value}
          secureTextEntry={this.props.secureTextEntry}
          keyboardType={this.props.keyboardType}
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
};

TextInputIcon.propTypes = {
  secureTextEntry: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  iconName: PropTypes.string,
  textPadding: PropTypes.number,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(TextInputIcon);
