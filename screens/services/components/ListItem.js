/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import { serviceListStyles } from '../../../styles/serviceListStyles';
import { appColors } from '../../../styles/colors';

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
      case 'Sent':
        st = { text: 'Por responder', color: 'yellow', textColor: appColors.grey };
        break;
      case 'Answered':
        st = { text: 'Respondida', color: 'yellow', textColor: appColors.grey };
        break;
      case 'Accepted':
        st = { text: 'Agendada', color: appColors.checked, textColor: appColors.white };
        break;
      case 'NoAccepted':
        st = { text: 'Tarifa no aceptada', color: appColors.grey, textColor: appColors.white };
        break;
      case 'Rejected':
        st = { text: 'Rechazada', color: appColors.grey, textColor: appColors.white };
        break;
      case 'Finished':
        st = { text: 'Completado', color: appColors.checked, textColor: appColors.white };
        break;
      default:
        st = '';
        break;
    }
    return st;
  }

  render() {
    const { data, onPressItem, type, action } = this.props;
    const st = this.setStatus(data.status);
    return (
      <TouchableHighlight
        onPress={() => onPressItem(data, type, action)}
        underlayColor="white"
      >
        <LinearGradient
          colors={[appColors.white, '#f4f4f4']}
          style={serviceListStyles.itemContainer}
        >
          <View style={serviceListStyles.textSection}>
            <Text style={serviceListStyles.itemTitle}>{data.service.name}</Text>
            <View style={serviceListStyles.subTitleContainer}>
              <FontAwesome
                name="clock-o"
                size={15}
                color={appColors.grey}
              />
              <Text style={serviceListStyles.itemSubTitle}>{this.setDateTime(data.dateTime)}</Text>
            </View>
            <View style={serviceListStyles.statusSection}>
              <View style={{ ...serviceListStyles.status, ...{ backgroundColor: st.color } }}>
                <Text style={{ color: st.textColor }}>{st.text}</Text>
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
