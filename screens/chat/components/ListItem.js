/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { chatStyles } from '../../../styles/chatStyles';
import { appColors } from '../../../styles/colors';

const defaultAvatar = require('../../../assets/images/default-avatar.png');

class ListItem extends Component {

  setDateTime = (ts) => {
    const dt = new Date(ts);
    if (dt.getDate() !== new Date().getDate()) {
      let year = dt.getFullYear();
      year = year.toString().substring(2, 3);
      return `${dt.getDate()}/${dt.getMonth()}/${year}`;
    }
    const amPm = dt.getHours() > 0 && dt.getHours() < 12 ? 'AM' : 'PM';
    return `${dt.getHours()}:${dt.getMinutes()} ${amPm}`;
  }

  setLastMessage = (m) => {
    if (!m.length) return { text: '', date: '' };

    const last = m[m.length - 1];
    return {
      text: last.text.length > 35 ? `${last.text}...` : last.text,
      date: this.setDateTime(last.timestamp),
    };
  }

  render() {
    const { data, onPressItem } = this.props;
    const last = this.setLastMessage(data.messages);
    return (
      <TouchableHighlight
        onPress={() => onPressItem(data)}
        underlayColor="white"
      >
        <LinearGradient
          colors={[appColors.white, '#f4f4f4']}
          style={chatStyles.itemContainer}
        >
          <View style={chatStyles.avatarSection}>
            <View style={chatStyles.avatarContainer}>
              <Image
                source={{ uri: data.user2.profileImage ? data.user2.profileImage : defaultAvatar }}
                style={chatStyles.avatarImage}
              />
            </View>
          </View>
          <View style={chatStyles.nameSection}>
            <Text style={chatStyles.nameText}>{`${data.user2.name} ${data.user2.lastName}`}</Text>
            <Text style={chatStyles.messageText}>Este es un último mensaje</Text>
          </View>
          <View style={chatStyles.dateSection}>
            <Text style={chatStyles.dateText}>8/20/19</Text>
            {/* <Text style={chatStyles.dateText}>{last.date}</Text> */}
          </View>
        </LinearGradient>
      </TouchableHighlight>
    );
  }
}

ListItem.propTypes = {
  language: PropTypes.shape({}).isRequired,
};

export default ListItem;
