import React, { Component } from 'react';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { getFromStorage, storeLocally, handleException } from '../../services/handlers/commonServices';
import { pushNotificationConfig, showNotification } from '../../config/pushNotificationConfig';
import { getUserByEmail } from '../../services/loginServices';
import { storeLoginInfo } from '../../redux/actions/session/loginActions';
import { storeSocket } from '../../redux/actions/session/homeActions';
import { appColors } from '../../styles/colors';
import { setNewMessage } from '../chat/ChatSocket';
import { appConstants } from '../../constants/appConstants';
import TextF from '../../components/custom/TextF';
import BigButtonIcon from '../../components/custom/BigButtonIcon';

const socketChat = io(appConstants.SOCKET_EP);

class Home extends Component {
  state = {
    servicesCategories: [],
    noFound: false,
    showLoader: false,
    user: {},
    isModalVisible: false,
    daviplataInput: '',
  }

  componentDidMount = () => {
    this.getUser();
    pushNotificationConfig(showNotification, this.onOpenNotification);
  }

  onOpenNotification = (not) => {
    const { id, action } = not.notification.payload.additionalData;
    if (action === 'OnWallet') {
      this.props.navigation.navigate('Wallet');
    } else {
      this.props.navigation.navigate('QuoteDetails',
        { quote: { _id: id }, action });
    }
  }

  initSocket = (userId) => {
    socketChat.connect();
    socketChat.emit('setId', userId);
    socketChat.off('incomingMessage');
    socketChat.on('incomingMessage', async (resp) => {
      if (resp.messageResp.success) {
        await setNewMessage(resp);
      }
    });
    this.props.storeSocket(socketChat);
  }

  getUser = async () => {
    const userData = JSON.parse(await getFromStorage('user-data'));
    if (!userData.profileImage || !userData._id) {
      try {
        const req = await getUserByEmail(userData.email);
        const resp = await req.json();
        if (resp.success) {
          this.props.storeLoginInfo(userData);
          storeLocally('user-data', resp.output);
          this.idObtained(resp.output._id);
        }
      } catch (err) { handleException('010', err, this); }
    } else {
      this.props.storeLoginInfo(userData);
      this.idObtained(userData._id);
    }
  }

  idObtained = (id) => {
    this.getUserServices(id);
    this.initSocket(id);
    this.setState(prev => ({ ...prev, user: { _id: id } }));
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render = () => (
    <Container style={commonStyles.container}>
      <Loader show={this.state.showLoader} />
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={this.state.showLoader}
            onRefresh={() => this.getUserServices(this.state.user._id)}
            colors={[appColors.primary, appColors.secondary]}
          />
        )}
        contentContainerStyle={{ flex: 1 }}
      >
        <View style={commonStyles.titleContainer}>
          <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>MOTORAPP</TextF>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <BigButtonIcon
            text="SOLICITAR REPUESTO"
            btnStyle={{ flexBasis: '80%', justifyContent: 'center', borderRadius: 10, marginTop: -20 }}
            onPress={() => this.props.navigation.navigate('MainForm', { userId: this.props.loginInfo._id })}
          />
        </View>
      </ScrollView>
    </Container>
  );
}

Home.propTypes = {
  language: PropTypes.shape({
    search: PropTypes.string.isRequired,
    see_all: PropTypes.string.isRequired,
  }).isRequired,
  loginInfo: PropTypes.object.isRequired,
  storeLoginInfo: PropTypes.func.isRequired,
  storeSocket: PropTypes.func.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

const mapDispachToProps = {
  storeLoginInfo,
  storeSocket,
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
