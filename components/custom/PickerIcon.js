import React, { Component } from 'react';
import { Picker, View } from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { commonStyles } from '../../styles/commonStyles';

class PickerIcon extends Component {
  render() {
    return (
      <View style={commonStyles.pickerContainer}>
        {this.props.iconName ? (
          <Icon
            style={{ ...commonStyles.textInputIcon, marginTop: 10, marginEnd: 5 }}
            name={this.props.iconName}
            size={20}
            color="#000"
          />
        ) : null}
        <Picker
          selectedValue={this.props.selectedValue}
          style={commonStyles.picker}
          onValueChange={itemValue => this.props.onValueChange(itemValue)}
        >
          {this.props.children}
        </Picker>
      </View>
    );
  }
}

PickerIcon.defaultProps = {
  selectedValue: '',
  iconName: '',
  onValueChange: () => {},
};

PickerIcon.propTypes = {
  selectedValue: PropTypes.string,
  onValueChange: PropTypes.func,
  iconName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(PickerIcon);
