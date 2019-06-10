/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, FlatList, Image, ToastAndroid } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from './components/ListItem';
import { getUserPayments } from '../../services/paymentsServices';
import { commonStyles } from '../../styles/commonStyles';
import { paymentListStyles } from '../../styles/serviceListStyles';
import Loader from '../../components/custom/Loader';
import { getFromStorage } from '../../services/handlers/commonServices';
import { billButton, daviBtnIcon, openDialogContent, openDaviDialogContent } from './components/DialogContent';
import Dialog from '../../components/custom/Dialog';
import { appColors } from '../../styles/colors';

class Wallet extends Component {
  state = {
    showLoader: false,
    payments: [],
    firstTime: true,
    showQuoteDialog: false,
    dialogContent: {},
    dialogButtons: [],
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => this.fetchUserServices(),
    );
    this.setDaviplataInfo();
  }

  setDaviplataInfo = async () => {
    const dp = JSON.parse(await getFromStorage('user-daviplata'));
    if (dp) {
      if (dp.userId === this.props.loginInfo._id) {
        this.setState(prevState => ({ ...prevState, daviplata: dp.daviplata }));
      }
    }
  }

  fetchUserServices = () => {
    this.showLoader(true);
    getUserPayments(this.props.loginInfo._id)
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
      .catch((err) => {
        this.showLoader(false);
        console.log(err);
      });
  }

  inputChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      search: value,
    }));
  };

  onDisburs = () => {
    ToastAndroid.show('onDisburs', ToastAndroid.LONG);
  }

  onLinkDaviplata = () => {
    ToastAndroid.show('onLinkDaviplata', ToastAndroid.LONG);
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  add = (payments) => {
    const p = payments.filter(x => x.status === 'OnWallet');
    let total = 0;
    for (let i = 0; i < p.length; i += 1) {
      total += p[i].value;
    }
    return total;
  }

  showDialog = (show, text, buttons) => {
    this.setState(prevState => ({ ...prevState,
      dialogContent: text,
      dialogButtons: buttons,
      showQuoteDialog: show }));
  }

  daviplataDialog = () => (
    <Dialog
      title="Desembolsar dinero"
      content={this.state.dialogContent}
      isVisible={this.state.showQuoteDialog}
      height={this.state.modalHeight}
      buttons={this.state.buttons}
    />
  )

  render() {
    const { payments, firstTime } = this.state;
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <Loader show={this.state.showLoader} />
        {billButton(openDialogContent(this.showDialog, this.onDisburs, this.props.language, this.state.daviplata))}
        {daviBtnIcon(openDaviDialogContent(this.showDialog, this.onLinkDaviplata, this.props.language,
          text => this.inputChangeHandler('cel', text), this.state.daviplataInput))}
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
                source={require('../../assets/images/no-records.png')}
                style={commonStyles.alertFullImage}
              />
              <Text h1 style={commonStyles.alertFullImageText}>
                Aún no tienes actividad de pagos
              </Text>
            </View>
          )
        ) : null}
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
