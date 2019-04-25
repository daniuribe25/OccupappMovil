import React, { Component } from 'react';
import { View } from 'react-native';
import { DatePicker, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';

class DatePickerIcon extends Component {
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
        <DatePicker
          defaultDate={this.props.defaultDate}
          locale={this.props.locale}
          timeZoneOffsetInMinutes={undefined}
          animationType="slide"
          androidMode="default"
          maximumDate={this.props.maximumDate}
          placeHolderText={this.props.placeHolder}
          textStyle={commonStyles.timePickerInput}
          placeHolderTextStyle={{ ...commonStyles.timePickerInput, color: appColors.placeHolder }}
          onDateChange={this.props.onDateChange}
          disabled={false}
        />
      </View>
    );
  }
}

DatePickerIcon.defaultProps = {
  iconName: '',
  onDateChange: () => {},
  placeHolder: '',
  maximumDate: undefined,
  defaultDate: undefined,
};

DatePickerIcon.propTypes = {
  onDateChange: PropTypes.func,
  iconName: PropTypes.string,
  maximumDate: PropTypes.instanceOf(Date),
  defaultDate: PropTypes.instanceOf(Date),
  placeHolder: PropTypes.string,
  locale: PropTypes.string.isRequired,
};

export default DatePickerIcon;
