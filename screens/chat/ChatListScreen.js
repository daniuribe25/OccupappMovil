/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, FlatList, Image, ScrollView, RefreshControl } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import ListItem from './components/ListItem';
import { getChats } from '../../services/chatServices';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';
import { serviceListStyles } from '../../styles/serviceListStyles';
import { storeLocally, getFromStorage } from '../../services/handlers/commonServices';

// const socketChat = io('http://10.0.2.2:3000');
// const socket = io('https://occupapp.herokuapp.com');

const noRecordImage = require('../../assets/images/no-records.png');

class ChatList extends Component {
  state = {
    showLoader: false,
    chats: [],
  };

  componentDidMount = async () => {
    this.props.navigation.addListener(
      'didFocus',
      () => this.fetchChats(),
    );
  }

  setChats = async (chats) => {
    const sChatNumber = await this.getChatNumbers();
    chats = chats.map((x) => {
      x.number = sChatNumber[x._id] || sChatNumber[x._id] !== 0 ? sChatNumber[x._id] : 0;
      return x;
    });
    this.setState(prev => ({ ...prev, chats }));
  }

  getChatNumbers = async () => {
    const sChatNumber = await getFromStorage('chatNumber');
    if (sChatNumber && sChatNumber !== '') {
      return JSON.parse(sChatNumber);
    }
    return {};
  }

  fetchChats = () => {
    this.showLoader(true);
    getChats(this.props.loginInfo._id)
      .then(res => res.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.success) {
          this.setChats(resp.output);
        }
      })
      .catch((err) => {
        this.showLoader(false);
        console.log(err);
      });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  onPressItem = (data) => {
    this.props.navigation.navigate('Chat', { data, chatId: data._id });
  }

  renderList = list => (
    <View style={serviceListStyles.serviceSection}>
      <FlatList
        data={list}
        renderItem={data => <ListItem data={data.item} onPressItem={this.onPressItem} userId={this.props.loginInfo._id} />}
      />
    </View>
  )

  render() {
    const { chats } = this.state;
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <Loader show={this.state.showLoader} />
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={this.state.showLoader}
              onRefresh={this.fetchChats}
              colors={[appColors.primary, appColors.secondary]}
            />
          )}
        >
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 25 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>CHAT</Text>
          </View>
          {chats.length ? this.renderList(chats) : null}
          {!chats.length ? (
            <View style={commonStyles.alertFullImageContainer}>
              <Image
                source={noRecordImage}
                style={commonStyles.alertFullImage}
              />
              <Text h1 style={commonStyles.alertFullImageText}>
                El chat se activará cuando un servicio esté agendado
              </Text>
            </View>
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

ChatList.propTypes = {
  language: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(ChatList);
