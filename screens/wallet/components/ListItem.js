/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { serviceListStyles, paymentListStyles } from '../../../styles/serviceListStyles';
import { appColors } from '../../../styles/colors';

const months = ['Ene', 'Feb', 'Mar', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

class ListItem extends Component {

  setDateTime = (dateTime) => {
    const dt = dateTime.split('T');
    const date = dt[0].split('-');
    return `${date[2]} ${months[+date[1] - 1]}, ${date[0]}`;
  }

  setStatus = (status) => {
    switch (status) {
      case 'OnWallet':
        return 'En Billetera';
      case 'Disbursed':
        return 'Desembolsado';
      default:
        return '';
    }
  }

  render() {
    const { data } = this.props;
    return (
      <LinearGradient
        colors={[appColors.white, '#f4f4f4']}
        style={serviceListStyles.itemContainer}
      >
        <View style={paymentListStyles.textSection}>
          <Text style={paymentListStyles.itemTitle}>{data.service.name}</Text>
          <Text style={paymentListStyles.itemDate}>{this.setDateTime(data.dateTime)}</Text>
          <Text style={{
            ...paymentListStyles.statusText,
            ...{ color: data.status === 'OnWallet' ? appColors.checked : appColors.mediumGrey } }}
          >
            {this.setStatus(data.status)}
          </Text>
        </View>
        <View style={paymentListStyles.priceSection}>
          <Text style={{
            ...paymentListStyles.priceText,
            ...{ color: data.status === 'OnWallet' ? appColors.checked : appColors.mediumGrey } }}
          >
            {`$ ${data.value}`}
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

ListItem.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

export default ListItem;
