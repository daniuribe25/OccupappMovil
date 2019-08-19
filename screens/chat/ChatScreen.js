/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { Container, Text } from 'native-base';
import PropTypes from 'prop-types';
import { GiftedChat } from 'react-native-gifted-chat';
// import { getFromStorage } from '../../services/handlers/commonServices';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';

class Chat extends Component {
  state = {
    showLoader: false,
    messages: [],
    user: {},
  };

  componentDidMount = async () => {
    this.setInitialMessages();
  }

  setInitialMessages = () => {
    const { navigation, loginInfo } = this.props;
    const data = navigation.getParam('data');
    const messages = data.messages.map(x => ({
      _id: x._id,
      text: x.text,
      createdAt: new Date(x.timestamp),
      user: {
        _id: x.user._id,
        name: `${x.user.name} ${x.user.lastName}`,
        avatar: x.user.profileImage,
      },
    }));
    this.setState(prev => ({ ...prev,
      messages,
      user: {
        _id: loginInfo._id,
        name: `${loginInfo.name} ${loginInfo.lastName}`,
      },
    }));
  }

  send = (m) => {
    console.log(m);
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render() {
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <Loader show={this.state.showLoader} />
        <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 25 } }}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>CHAT</Text>
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={this.send}
          user={this.state.user}
        />
      </Container>
    );
  }
}

Chat.propTypes = {
  language: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(Chat);
