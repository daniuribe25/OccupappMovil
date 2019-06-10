import React, { Component } from 'react';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, TextInput, ToastAndroid, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import ServiceCarousel from './components/ServiceCarousel';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { carouselStyles } from '../../styles/carouselStyles';
import { searchBarStyles } from '../../styles/searchInputStyles';
import { getUserServicesWithCategories } from '../../services/userServicesServices';
import { getFromStorage, storeLocally } from '../../services/handlers/commonServices';
import { pushNotificationConfig } from '../../config/pushNotificationConfig';
import { getUserByEmail } from '../../services/loginServices';
import { storeLoginInfo } from '../../redux/actions/session/loginActions';
import { appColors } from '../../styles/colors';

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
    this.getUserServices();
    this.getUser();
    pushNotificationConfig(null, this.onOpenNotification);
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

  getUser = async () => {
    const userData = JSON.parse(await getFromStorage('user-data'));
    if (!userData.profileImage || !userData._id) {
      getUserByEmail(userData.email)
        .then(req => req.json())
        .then((resp) => {
          if (resp.success) {
            this.props.storeLoginInfo(userData);
            storeLocally('user-data', resp.output);
          }
        }).catch(() => {
          ToastAndroid.show('Error 010', ToastAndroid.LONG);
        });
    } else {
      this.props.storeLoginInfo(userData);
    }
  }

  getUserServices = () => {
    this.showLoader(true);
    getUserServicesWithCategories(0)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) {
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
          }));
        }
      })
      .catch(() => {
        this.showLoader(false);
        ToastAndroid.show('Error 009', ToastAndroid.LONG);
      });
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
          <Text style={carouselStyles.category}>{x}</Text>
          <Text
            style={carouselStyles.seeAllLink}
            onPress={() => this.goToServices(x, false)}
          >
            {this.props.language['see_all']}
          </Text>
        </View>
        <ServiceCarousel
          services={servicesCategories[x]}
          navigation={this.props.navigation}
        />
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
      {/* <Icon style={searchBarStyles.filterIcon} name="filter" size={20} onPress={this.toggleModal} /> */}
    </View>
  );

  render = () => (
    <Container style={commonStyles.container}>
      <Loader show={this.state.showLoader} />
      <ScrollView>
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
          {this.searchInput()}
          {this.state.noFound ? (
            <Text style={commonStyles.noRecordsFound}>
              No se encontraron servicios
            </Text>
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
            <Text style={{ fontWeight: '500', fontSize: 22, color: appColors.primary }}>Felicidades!</Text>
          </View>
          <View style={{ height: 40 }}>
            <Text style={{ fontSize: 17 }}>Tienes una nueva cotización.</Text>
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
  language: PropTypes.objectOf({}).isRequired,
  storeLoginInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

const mapDispachToProps = {
  storeLoginInfo,
};

export default connect(mapStateToProps, mapDispachToProps)(Home);
