/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import { getFromStorage, storeLocally } from '../../services/handlers/commonServices';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import BackButton from '../../components/custom/BackButton';
import { appColors } from '../../styles/colors';
import TextF from '../../components/custom/TextF';

let socketChat = {};

class Chat extends Component {
  state = {
    showLoader: false,
    messages: [],
    user: {},
  };

  componentDidMount = async () => {
    socketChat = this.props.socket;
    this.setInitialMessages();
    socketChat.off('incomingMessage');
    socketChat.on('incomingMessage', (resp) => {
      this.setIncommingMessage(resp);
    });
    this.props.navigation.addListener(
      'didFocus',
      () => this.seeMessage(),
    );
  }

  setInitialMessages = () => {
    const { navigation, loginInfo } = this.props;
    const data = navigation.getParam('data');
    const messages = data.messages.map((x) => {
      const u = data.user1Id === x.userId ? data.user1 : data.user2;
      return {
        _id: x._id,
        text: x.text,
        createdAt: new Date(x.createdAt),
        user: {
          _id: u._id,
          name: `${u.name} ${u.lastName}`,
          avatar: u.profileImage,
        },
      };
    });
    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    this.setState(prev => ({ ...prev,
      messages: GiftedChat.append(prev.messages, messages),
      user: {
        _id: loginInfo._id,
        name: `${loginInfo.name} ${loginInfo.lastName}`,
        avatar: loginInfo.profileImage,
      },
      user2: data.user1Id === loginInfo._id ? data.user2 : data.user1,
      chatId: data._id,
    }));
  }

  setIncommingMessage = (resp) => {
    if (!resp.sender && resp.messageResp.success) {
      const { user2 } = this.state;
      const { output } = resp.messageResp;
      const m = [{
        _id: output._id,
        text: output.text,
        createdAt: new Date(output.createdAt),
        user: {
          _id: user2._id,
          name: user2.name,
          avatar: user2.profileImage,
        },
      }];
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, m),
      }));
    }
  }

  seeMessage = async () => {
    let sChatNumber = await getFromStorage('chatNumber');
    if (sChatNumber && sChatNumber !== '') {
      sChatNumber = JSON.parse(sChatNumber);
      delete sChatNumber[this.props.navigation.getParam('chatId')];
      storeLocally('chatNumber', sChatNumber);
    }
  }

  send = (m) => {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, m),
    }));
    socketChat.emit('message', {
      text: m[0].text,
      user: m[0].user._id,
      createdAt: m[0].createdAt,
      user2: this.state.user2._id,
      chatId: this.state.chatId,
    });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  renderSend = (props) => {
    if (props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          onPress={() => props.onSend({ text: props.text }, true)}
          style={{ top: -15 }}
        >
          <TextF
            style={{ color: appColors.primary, fontWeight: '500', fontSize: 18, marginRight: 15 }}
          >
        Enviar
          </TextF>
        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <Loader show={this.state.showLoader} />
        <BackButton
          onPress={() => this.props.navigation.goBack()}
          icon="arrow-left"
          color={appColors.primary}
          type="material-community"
        />
        {this.state.user2 ? (
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 5 } }}>
            <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>{this.state.user2.name.toUpperCase()}</TextF>
          </View>
        ) : null}
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.state.user}
          placeholder="Escribe un mensaje"
          alwaysShowSend
          isAnimated
          showUserAvatar
          scrollToBottom
          renderSend={this.renderSend}
        />
      </Container>
    );
  }
}

Chat.propTypes = {
  language: PropTypes.shape({}).isRequired,
  socket: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
  socket: state.home.socket,
});

export default connect(mapStateToProps)(Chat);
