/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, FlatList, Image, ToastAndroid, TouchableHighlight, Alert, ScrollView, RefreshControl } from 'react-native';
import { Container, Text, Button } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import ListItem from './components/ListItem';
import { getUserPayments, disbursPayments } from '../../services/paymentsServices';
import { linkDaviplata } from '../../services/loginServices';
import { commonStyles } from '../../styles/commonStyles';
import { paymentListStyles } from '../../styles/serviceListStyles';
import Loader from '../../components/custom/Loader';
import { getFromStorage, storeLocally } from '../../services/handlers/commonServices';
import Dialog from '../../components/custom/Dialog';
import { appColors } from '../../styles/colors';
import TextInputIcon from '../../components/custom/TextInputIcon';

const nrImage = require('../../assets/images/no-records.png');
const dpImage = require('../../assets/images/dp.png');

class Wallet extends Component {
  state = {
    showLoader: false,
    payments: [],
    firstTime: true,
    showQuoteDialog: false,
    modalHeight: 50,
    daviplata: '',
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => this.fetchUserPayments(),
    );
  }

  fetchUserPayments = async () => {
    this.showLoader(true);
    const user = this.state.user || JSON.parse(await getFromStorage('user-data'));
    this.setState(prevState => ({ ...prevState, user, daviplata: user.daviplata }));
    getUserPayments(user._id)
      .then(res => res.json())
      .then((resp) => {
        this.showLoader(false);
        let p = [];
        if (resp.success) { p = resp.output; }
        this.setState(prevState => ({
          ...prevState,
          payments: p,
          firstTime: false,
        }));
      })
      .catch(() => {
        this.showLoader(false);
        ToastAndroid.show('017', ToastAndroid.LONG);
      });
  }

  inputChangeHandler = (key, value) => {
    this.setState(prevState => ({
      ...prevState, [key]: value,
    }));
  };

  onDisburs = () => {
    this.showLoader(true);
    disbursPayments(this.state.user._id)
      .then(res => res.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) {
          Alert.alert('Error', resp.message);
          return;
        }
        this.showDialog(false, 50, true);
        Alert.alert('Info', 'Se ha desembolsado tu dinero correctamente, el pago se verá reflejado en las proximas horas',
          [{ text: 'OK', onPress: () => {} }], { cancelable: false });
        this.fetchUserPayments();
      })
      .catch(() => {
        this.showLoader(false);
        ToastAndroid.show('016', ToastAndroid.LONG);
      });
  }

  onLinkDaviplata = () => {
    const { daviplata, user } = this.state;
    if (daviplata.length < 10 || !(/^\d+$/.test(daviplata))) {
      ToastAndroid.show('Número celular no válido', ToastAndroid.LONG);
      return;
    }
    linkDaviplata({ daviplata, id: user._id })
      .then(res => res.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.success) {
          this.showDialog(false, 50, true);
          user.daviplata = daviplata;
          storeLocally('user-data', user);
          Alert.alert('Info', 'Se ha vinculado tu cuenta davivienda correctamente, ahora podrás realizar desembolsos de dinero',
            [{ text: 'OK', onPress: () => {} }], { cancelable: false });
        } else {
          Alert.alert('Error', resp.message);
        }
      })
      .catch(() => {
        ToastAndroid.show('016', ToastAndroid.LONG);
      });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  add = (payments) => {
    const p = payments.filter(x => ['OnWallet', 'PayPending'].indexOf(x.status) !== -1);
    let total = 0;
    for (let i = 0; i < p.length; i += 1) {
      total += p[i].value;
    }
    return total;
  }

  showDialog = (show, modalHeight, isDaviplata) => {
    this.setState(prevState => ({ ...prevState,
      showQuoteDialog: show,
      modalHeight,
      isDaviplata,
    }));
  }

  daviplataDialog = () => (
    <Dialog
      title={this.state.isDaviplata ? 'Vincular Daviplata' : 'Desembolsar dinero'}
      content={this.dialogContent()}
      isVisible={this.state.showQuoteDialog}
      height={this.state.modalHeight}
      buttons={this.dialogButtons()}
    />
  )

  billButton = () => (
    <View>
      <Button
        transparent
        style={paymentListStyles.billBtnIconContainer}
        onPress={() => this.showDialog(true, 50, false)}
      >
        <Icon
          type="font-awesome"
          name="money"
          style={commonStyles.backBtnIcon}
          color={appColors.primary}
          size={25}
        />
      </Button>
    </View>
  );

  daviBtnIcon = () => (
    <TouchableHighlight
      onPress={() => this.showDialog(true, 170, true)}
      underlayColor="white"
      style={paymentListStyles.daviBtnIconContainer}
    >
      <Image
        source={dpImage}
        style={paymentListStyles.daviBtnIcon}
      />
    </TouchableHighlight>
  );

  dialogContent = () => {
    let content = {};
    if (!this.state.isDaviplata) {
      if (this.state.user && this.state.user.daviplata) {
        content = <Text>¿Desea desembolsar su dinero?</Text>;
      } else {
        content = <Text>Primero debes vincular tu cuenta de daviplata para poder desembolsarte</Text>;
      }
    } else {
      content = (
        <View>
          <Text>Ingresa el número celular que tienes vinculado a tu cuenta Daviplata para así poder realizar los pagos por tus servicios</Text>
          <TextInputIcon
            placeholder="cel"
            value={this.state.daviplata}
            onChangeText={text => this.inputChangeHandler('daviplata', text)}
            keyboardType="numeric"
            textContentType="telephoneNumber"
          />
        </View>
      );
    }
    return content;
  };

  dialogButtons = () => {
    let buttons = [];
    if (!this.state.isDaviplata) {
      if (this.state.user && this.state.user.daviplata) {
        buttons = [{
          title: this.props.language.get_out,
          onPress: () => this.showDialog(false, 50, false),
          style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
        }, {
          title: this.props.language.send,
          onPress: this.onDisburs,
          style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.secondary },
        }];
      } else {
        buttons = [{
          title: this.props.language.get_out,
          onPress: () => this.showDialog(false, 50, false),
          style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
        }];
      }
    } else {
      buttons = [{
        title: this.props.language.get_out,
        onPress: () => this.showDialog(false, 170, true),
        style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
      }, {
        title: this.props.language.save,
        onPress: this.onLinkDaviplata,
        style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.secondary },
      }];
    }
    return buttons;
  }

  render() {
    const { payments, firstTime } = this.state;
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <Loader show={this.state.showLoader} />
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={this.state.showLoader}
              onRefresh={this.fetchUserServices}
              colors={[appColors.primary, appColors.secondary]}
            />
          )}
        >
          {this.billButton()}
          {this.daviBtnIcon()}

          {this.daviplataDialog()}

          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 5 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>WALLET</Text>
          </View>
          {!firstTime ? (
            payments.length ? (
              <React.Fragment>
                <FlatList
                  data={payments}
                  renderItem={data => <ListItem data={data.item} type="quote" />}
                />
                <View style={paymentListStyles.totalContainer}>
                  <Text style={paymentListStyles.totalText} h1>
                    Billetera
                  </Text>
                  <Text style={paymentListStyles.totalValue} h1>
                    {`$ ${this.add(payments)}`}
                  </Text>
                </View>
              </React.Fragment>
            ) : (
              <View style={commonStyles.alertFullImageContainer}>
                <Image
                  source={nrImage}
                  style={commonStyles.alertFullImage}
                />
                <Text h1 style={commonStyles.alertFullImageText}>
                  Aún no tienes actividad de pagos
                </Text>
              </View>
            )
          ) : null}
        </ScrollView>
      </Container>
    );
  }
}

Wallet.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(Wallet);
