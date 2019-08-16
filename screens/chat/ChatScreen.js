/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../../config/Fire';
import { getFromStorage } from '../../services/handlers/commonServices';

const pass = '921225';

class Chat extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Chat!',
  });

  state = {
    messages: [],
    user: {
      name: 'Daniel',
      _id: Fire.shared.uid,
    },
  };

  componentDidMount = async () => {
    Fire.shared.on((message) => {
      this.setState(prevState => ({
        ...prevState,
        messages: GiftedChat.append(prevState.messages, message),
      }));
    });

    const userData = JSON.parse(await getFromStorage('user-data'));
    Fire.shared.observeAuth(userData.email, pass);
  }

  componentWillUnmount() {
    Fire.shared.off();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.shared.send}
        user={this.state.user}
      />
    );
  }
}

Chat.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(Chat);
