import React, { Component } from 'react';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, ScrollView, TextInput, Button, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Modal from 'react-native-modal';
import ServiceCarousel from './components/ServiceCarousel';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { carouselStyles } from '../../styles/carouselStyles';
import { searchBarStyles } from '../../styles/searchInputStyles';
import { getUserServicesWithCategories } from '../../services/userServicesServices';
import { getFromStorage, storeLocally, handleException } from '../../services/handlers/commonServices';
import { pushNotificationConfig, showNotification } from '../../config/pushNotificationConfig';
import { getUserByEmail } from '../../services/loginServices';
import { storeLoginInfo } from '../../redux/actions/session/loginActions';
import { storeSocket } from '../../redux/actions/session/homeActions';
import { appColors } from '../../styles/colors';
import { setNewMessage } from '../chat/ChatSocket';
import { appConstants } from '../../constants/appConstants';
import TextF from '../../components/custom/TextF';

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
    pushNotificationConfig(/* showNotification */ null, this.onOpenNotification);
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

  getUserServices = async (userId) => {
    try {
      this.showLoader(true);
      const req = await getUserServicesWithCategories(userId, 0);
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.output.length) {
        this.setState(prevState => ({ ...prevState, noFound: true }));
      } else {
        const servicesCategories = resp.output.reduce((r, a) => {
          r[a.category] = r[a.category] || [];
          r[a.category].push(a);
          return r;
        }, Object.create(null));
        this.setState(prevState => ({
          ...prevState,
          servicesCategories,
          noFound: false,
        }));
      }
    } catch (err) { handleException('009', err, this); }
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  inputChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      daviplataInput: value,
    }));
  };

  createCarousels = () => {
    const { servicesCategories } = this.state;
    return Object.keys(servicesCategories).map((x, i) => (
      <React.Fragment key={i}>
        <View style={carouselStyles.header}>
          <TextF style={carouselStyles.category}>{x}</TextF>
          <TextF
            style={carouselStyles.seeAllLink}
            onPress={() => this.goToServices(x, false)}
          >
            {this.props.language['see_all']}
          </TextF>
        </View>
        <ServiceCarousel
          services={servicesCategories[x]}
          navigation={this.props.navigation}
        />
        <View style={{ height: 15 }} />
      </React.Fragment>
    ));
  }

  goToServices = (cat, isSearch) => {
    const { servicesCategories } = this.state;
    let services = [];
    Object.keys(servicesCategories).forEach((x) => {
      if (isSearch || x === cat) {
        services = [...services, ...servicesCategories[x]];
      }
    });
    this.props.navigation.navigate('AllServices', { services, type: isSearch ? 0 : 1 });
  }

  toggleModal = () => {
    this.setState(prevState => ({ ...prevState, isModalVisible: !prevState.isModalVisible }));
  }

  searchInput = () => (
    <View style={searchBarStyles.container}>
      <Icon style={searchBarStyles.icon} name="search" size={15} />
      <TextInput
        style={searchBarStyles.input}
        placeholder={this.props.language['search']}
        onChangeText={text => this.inputChangeHandler(text)}
        value={this.state.search}
        maxLength={30}
        onFocus={() => this.goToServices('', true)}
      />
      {/* <Icon style={searchBarStyles.filterIcon} name="filter"
      size={20} onPress={this.toggleModal} /> */}
    </View>
  );

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
      >
       
        <View style={commonStyles.titleContainer}>
          <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</TextF>
          {this.searchInput()}
          {this.state.noFound ? (
            <TextF style={commonStyles.noRecordsFound}>
              No se encontraron servicios
            </TextF>
          ) : null}
          {this.createCarousels()}
        </View>
      </ScrollView>

      <Modal
        transparent
        isVisible={this.state.isModalVisible}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: appColors.white,
          height: 150,
          width: '100%',
          paddingVertical: 15,
          paddingHorizontal: 30,
          borderRadius: 6,
        }}
        >
          <View style={{ height: 40 }}>
            <TextF style={{ fontWeight: '500', fontSize: 22, color: appColors.primary }}>Felicidades!</TextF>
          </View>
          <View style={{ height: 40 }}>
            <TextF style={{ fontSize: 17 }}>Tienes una nueva cotización.</TextF>
          </View>
          <View style={{ height: 50, alignItems: 'flex-end', alignSelf: 'flex-end' }}>
            <Button title="Ir a Cotizaciones" onPress={this.toggleModal} color={appColors.secondary} />
          </View>
        </View>
      </Modal>
    </Container>
  );
}

Home.propTypes = {
  language: PropTypes.shape({
    search: PropTypes.string.isRequired,
    see_all: PropTypes.string.isRequired,
  }).isRequired,
  storeLoginInfo: PropTypes.func.isRequired,
  storeSocket: PropTypes.func.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

const mapDispachToProps = {
  storeLoginInfo,
  storeSocket,
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
