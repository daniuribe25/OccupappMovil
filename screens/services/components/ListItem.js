/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { serviceListStyles } from '../../../styles/serviceListStyles';
import { appColors } from '../../../styles/colors';
import { quoteStatus } from '../../../constants/appConstants';
import TextF from '../../../components/custom/TextF';

class ListItem extends Component {

  setDateTime = (dateTime) => {
    const dt = dateTime.split('T');
    const date = dt[0].split('-');
    const time = dt[1].substring(0, 8);
    return `${date[2]}/${date[1]}/${date[0]} ${time}`;
  }

  setStatus = (status) => {
    let st = '';
    switch (status) {
      case quoteStatus.QUOTE_STATUS_SENT:
        st = { text: 'Por responder', color: '#e8cd02', textColor: appColors.grey };
        break;
      case quoteStatus.QUOTE_STATUS_ANSWERED:
        st = { text: 'Respondida', color: '#e8cd02', textColor: appColors.grey };
        break;
      case quoteStatus.QUOTE_STATUS_ACCEPTED:
        st = { text: 'Agendada', color: appColors.checked, textColor: appColors.white };
        break;
      case quoteStatus.QUOTE_STATUS_NO_ACCEPTED:
        st = { text: 'Tarifa no aceptada', color: appColors.grey, textColor: appColors.white };
        break;
      case quoteStatus.QUOTE_STATUS_REJECTED:
        st = { text: 'Rechazada', color: appColors.grey, textColor: appColors.white };
        break;
      case quoteStatus.QUOTE_STATUS_FINISHED:
        st = { text: 'Completado', color: appColors.checked, textColor: appColors.white };
        break;
      case 'Waiting':
        st = { text: 'Espera de respuesta', color: '#e8cd02', textColor: appColors.grey };
        break;
      case 'Quoted':
        st = { text: 'Cotizado', color: '#e8cd02', textColor: appColors.grey };
        break;
      default:
        st = '';
        break;
    }
    return st;
  }

  render() {
    const { data, onPressItem, type } = this.props;
    const st = this.setStatus(data.statusToShow);
    return (
      <TouchableHighlight
        onPress={() => onPressItem(data, type)}
        underlayColor="white"
      >
        <LinearGradient
          colors={[appColors.white, '#f4f4f4']}
          style={serviceListStyles.itemContainer}
        >
          <View style={serviceListStyles.textSection}>
            <TextF style={serviceListStyles.itemTitle}>{data.service.name}</TextF>
            <View style={serviceListStyles.subTitleContainer}>
              <FontAwesome
                name="clock-o"
                size={15}
                color={appColors.grey}
              />
              <TextF style={serviceListStyles.itemSubTitle}>{this.setDateTime(data.dateTime)}</TextF>
            </View>
            <View style={serviceListStyles.statusSection}>
              <View style={{ ...serviceListStyles.status, ...{ backgroundColor: st.color } }}>
                <TextF style={{ color: st.textColor }}>{st.text}</TextF>
              </View>
            </View>
          </View>
          <View style={serviceListStyles.iconSection}>
            <FontAwesome
              name="angle-right"
              size={20}
              color={appColors.grey}
            />
          </View>
        </LinearGradient>
      </TouchableHighlight>
    );
  }
}

ListItem.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

export default ListItem;
