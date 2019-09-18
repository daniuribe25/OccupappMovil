/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { chatStyles } from '../../../styles/chatStyles';
import { appColors } from '../../../styles/colors';
import TextF from '../../../components/custom/TextF';

const defaultAvatar = require('../../../assets/images/default-avatar.png');

class ListItem extends Component {
  setDateTime = (ts) => {
    const dt = new Date(ts);
    if (dt.getDate() !== new Date().getDate()) {
      let year = dt.getFullYear();
      year = year.toString().substring(2, 4);
      return `${dt.getDate()}/${dt.getMonth() + 1}/${year}`;
    }
    const amPm = dt.getHours() > 0 && dt.getHours() < 12 ? 'AM' : 'PM';
    return `${dt.getHours()}:${dt.getMinutes() > 9 ? dt.getMinutes() : `0${dt.getMinutes()}`} ${amPm}`;
  }

  setLastMessage = (m) => {
    if (!m.length) return { text: '', date: '' };

    const last = m[m.length - 1];
    return {
      text: last.text.length > 25 ? `${last.text.substring(0, 25)}...` : last.text,
      date: this.setDateTime(last.createdAt),
    };
  }

  render() {
    const { data, onPressItem, userId } = this.props;
    const last = this.setLastMessage(data.messages);
    const user2 = data.user1Id === userId ? data.user2 : data.user1;
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
                source={{ uri: user2.profileImage ? user2.profileImage : defaultAvatar }}
                style={chatStyles.avatarImage}
              />
            </View>
          </View>
          <View style={chatStyles.nameSection}>
            <TextF style={chatStyles.nameText}>{`${data.user2.name} ${data.user2.lastName}`}</TextF>
            {last.text !== '' ? (
              <TextF style={chatStyles.messageText}>{last.text}</TextF>
            ) : null}
          </View>
          <View style={chatStyles.dateSection}>
            <TextF style={{
              ...chatStyles.dateText,
              ...{ textAlignVertical: data.number ? 'top' : 'center' } }}
            >
              {last.date}
            </TextF>
            {data.number ? (
              <View style={chatStyles.numberSection}>
                <TextF style={chatStyles.number}>{23}</TextF>
              </View>
            ) : null}
          </View>
        </LinearGradient>
      </TouchableHighlight>
    );
  }
}

export default ListItem;
