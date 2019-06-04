/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
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

  render() {
    const { data, onPressItem, type } = this.props;
    return (
      <TouchableHighlight
        onPress={() => onPressItem(data, type)}
        underlayColor="white"
      >
        <View style={serviceListStyles.itemContainer}>
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
            
          </View>
          <View style={serviceListStyles.iconSection}>
            <Icon
              name="angle-right"
              size={20}
              color={appColors.grey}
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

ListItem.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

export default ListItem;
