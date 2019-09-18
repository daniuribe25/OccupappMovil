/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Alert, TextInput, ScrollView, ToastAndroid } from 'react-native';
import { Container, Text } from 'native-base';
import { Button, Rating } from 'react-native-elements';
import { connect } from 'react-redux';
import ImageView from 'react-native-image-view';
import PropTypes from 'prop-types';
import { getQuote, answerQuote, rateService } from '../../services/quoteServices';
import { getPaymentUrl, getLastPayment, updatePayment } from '../../services/paymentsServices';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { quoteStyles } from '../../styles/quoteStyles';
import QuoteCarousel from './components/QuoteCarousel';
import Dialog from '../../components/custom/Dialog';
import { appColors } from '../../styles/colors';
import { setQuoteTitle, setQuoteMessage } from './components/QuoteDescriptions';
import BackButton from '../../components/custom/BackButton';
import { handleException } from '../../services/handlers/commonServices';
import { appConstants } from '../../constants/appConstants';

class QuoteDetails extends Component {
  state = {
    quote: {
      quoteMedia: [],
    },
    formData: {
      accept: false,
    },
    showLoader: false,
    showImageViwer: false,
    showQuoteDialog: false,
    imageIndex: 0,
    images: [],
    modalHeight: 60,
    user: {},
  }

  componentWillMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => {
        const fromPayment = this.props.navigation.getParam('fromPayment');
        if (fromPayment) {
          this.fetchLastPayments();
        } else {
          this.fetchQuote();
        }
      },
    );
  }

  fetchLastPayments = async () => {
    this.showLoader(true);
    this.getLastPayment();
    this.setState({ paymentCont: 0 });
  }

  sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  getLastPayment = async () => {
    this.showLoader(true);
    const req = await getLastPayment(this.props.loginInfo.email);
    const res = await req.json();
    this.setState(prev => ({ ...prev, paymentCont: prev.paymentCont + 1 }));
    if (!res.success) {
      if (this.state.paymentCont !== 5) {
        await this.sleep(2500);
        this.getLastPayment();
      } else {
        this.showLoader(false);
        Alert.alert('Info', 'Lo sentimos, su pago no pudo ser procesado en el momento, intentelo más tarde',
          [{ text: 'OK', onPress: () => this.props.navigation.navigate('ServiceList') }],
          { cancelable: false });
      }
    } else {
      this.showLoader(false);
      this.acceptQuote(true);
      this.updatePayment(res.output[0]._id);
      this.fetchQuote();
    }
  }

  updatePayment = async (pId) => {
    const quote = this.props.navigation.getParam('quote') || {};
    console.log(quote);
    if (quote) {
      const req = await updatePayment(pId, quote);
      const res = await req.json();
      console.log(res);
    }
  }

  setDateTime = (dateTime) => {
    if (dateTime) {
      const dt = dateTime.split('T');
      const date = dt[0].split('-');
      const time = dt[1].substring(0, 8);
      return `${date[2]}/${date[1]}/${date[0]} ${time}`;
    }
    return '';
  }

  fetchQuote = async () => {
    const q = this.props.navigation.getParam('quote');
    this.showLoader(true);
    try {
      const req = await getQuote(q._id);
      const resp = await req.json();
      this.showLoader(false);
      if (resp.success) this.setData(resp.output);
    } catch (err) { handleException('011', err, this); }
  }

  setData = (quote) => {
    const images = [];
    quote.quoteMedia = quote.quoteMedia.map((m) => {
      m.uri = m.mediaUrl;
      images.push({ source: { uri: m.uri } });
      return m;
    });
    this.setState(prevState => ({ ...prevState,
      quote,
      action: quote.status,
      user: this.props.loginInfo,
      formData: { ...prevState.formData,
        id: quote._id,
        sentBy: quote.sentBy._id,
        receivedBy: quote.receivedBy._id,
        price: quote.price ? Math.round(quote.price + (quote.price * appConstants.PRICE_FARE)) : 0 },
      images,
    }));
  }

  inputChangeHandler = (name, value) => {
    this.setState(prevState => ({ ...prevState,
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];

    if (data.accept && this.state.action === 'Sent' && !(/^\d+$/.test(data.price))) {
      errorMessages.push('Precio no es un valor válido');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = async (accept) => {
    if (!this.validateForm(this.state.formData)) return;

    const data = this.state.formData;
    data.status = this.setFormState(accept);
    data.accept = accept;

    this.showLoader(true);
    try {
      const req = await answerQuote(data);
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.success) { Alert.alert('Error', resp.message); return; }
      this.showQuoteDialog(false, true);

      const mess = this.props.navigation.getParam('fromPayment') && data.status === 'Accepted'
        ? 'Se ha agendado tu servicio correctamente' : 'Se ha enviado tu respuesta correctamente';
      Alert.alert('Info', mess,
        [{ text: 'OK', onPress: () => this.props.navigation.navigate('ServiceList') }],
        { cancelable: false });
    } catch (err) { handleException('013', err, this); }
  }

  acceptQuote = (accept) => {
    this.setState(prevState => ({ ...prevState,
      formData: { ...prevState.formData, accept },
    }), () => this.onSendInfo(accept, false));
  }

  getPaymentUrl = async () => {
    try {
      this.showLoader(true);
      const { quote, user, formData } = this.state;
      const preferences = {
        title: quote.service.name,
        unit_price: Math.round(formData.price + (formData.price * appConstants.PRICE_FARE)),
        email: user.email,
        name: user.name,
        surname: user.lastName,
        phone: user.phone,
      };
      const req = await getPaymentUrl(preferences);
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.success) {
        Alert.alert('Error', resp.message);
      } else {
        this.props.navigation.navigate('Payment', { paymentUrl: resp.output, quote: this.state.quote });
      }
    } catch (err) { handleException('011', err, this); }
  }

  setFormState = (accept) => {
    const { action } = this.state;
    if (action === 'Sent' && accept) return 'Answered';
    if (action === 'Sent' && !accept) return 'Rejected';
    if (action !== 'Sent' && accept) return 'Accepted';
    if (action !== 'Sent' && !accept) return 'NoAccepted';
    return 'NoAccepted';
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  showQuoteDialog = (show, accept) => {
    this.setState(prevState => ({ ...prevState,
      formData: { ...prevState.formData, accept },
      modalHeight: accept ? 170 : 100,
      showQuoteDialog: show }));
  }

  onPressImage = (uri) => {
    const { quoteMedia } = this.state.quote;
    const i = quoteMedia.findIndex(x => x.uri === uri);
    this.setState(prevState => ({ ...prevState,
      showImageViwer: true,
      imageIndex: i }));
  }

  onRating = async (r) => {
    this.showLoader(true);
    try {
      const req = await rateService(r, this.state.quote._id);
      const resp = await req.json();
      this.showLoader(false);
      if (resp.success) { ToastAndroid.show('Servicio calificado', ToastAndroid.LONG); }
    } catch (err) { handleException('013', err, this); }
  }

  quoteDialog = () => (
    <View style={{ width: '100%', height: this.state.modalHeight }}>
      {this.state.formData.accept ? (
        <TextInput
          style={commonStyles.textInput}
          value={this.state.formData.price}
          placeholder={this.props.language.price}
          onChangeText={text => this.inputChangeHandler('price', text)}
        />
      ) : null}
      <TextInput
        style={commonStyles.textInput}
        placeholder={this.props.language.observation}
        ref={(c) => { this.descriptionInput = c; }}
        value={this.state.formData.observation}
        onChangeText={text => this.inputChangeHandler('observation', text)}
        multiline
        numberOfLines={4}
      />
    </View>
  );

  render() {
    const { quote, images, imageIndex, showImageViwer, action, formData, user } = this.state;
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
        >
          <Loader show={this.state.showLoader} />
          <BackButton
            onPress={() => this.props.navigation.goBack()}
            icon="arrow-left"
            color={appColors.primary}
            type="material-community"
          />
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 5 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>COTIZACIÓN</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            {setQuoteTitle(action, this.props.language)}
            {setQuoteMessage(action, this.props.language, formData.price, user._id, formData.sentBy)}
            {quote.observation && quote.observation !== '' ? (
              <View>
                <Text style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
                  <Text style={{ ...quoteStyles.titleText, color: appColors.primary }}>
                    {this.props.language.observations}
                  </Text>
                  {quote.observation}
                </Text>
              </View>
            ) : null}
            <View>
              <Text style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
                <Text style={quoteStyles.titleText}>
                  {this.props.language.datetime_label}
                </Text>
                {this.setDateTime(quote.dateTime)}
              </Text>
            </View>
            <View>
              <Text style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
                <Text style={quoteStyles.titleText}>
                  {this.props.language.description_label}
                </Text>
                {quote.description}
              </Text>
            </View>
            <View>
              <Text style={{ ...quoteStyles.descriptionText, ...{ textAlign: 'left' } }}>
                <Text style={quoteStyles.titleText}>
                  {this.props.language.location_label}
                </Text>
                {quote.location}
              </Text>
            </View>
            {quote.quoteMedia.length ? (
              <View style={{ marginTop: 15, height: 170 }}>
                <QuoteCarousel media={quote.quoteMedia} onPressImage={this.onPressImage} />
                <ImageView
                  images={images}
                  imageIndex={imageIndex}
                  isVisible={showImageViwer}
                />
              </View>
            ) : null}
            {action === 'Sent' || action === 'Answered' ? (
              <View style={{ paddingVertical: 25, textAlign: 'center', height: 100, justifyContent: 'center', alignItems: 'stretch', flexDirection: 'row', width: '100%' }}>
                <Button
                  buttonStyle={{ paddingVertical: 10, backgroundColor: appColors.primary }}
                  containerStyle={{ width: '45%', marginRight: 10 }}
                  btnContainerStyle={{ paddingTop: 20, paddingBottom: 0 }}
                  title={this.props.language.accept}
                  onPress={() => action === 'Sent' ? this.showQuoteDialog(true, true) : this.getPaymentUrl()}
                />
                <Button
                  buttonStyle={{ paddingVertical: 10 }}
                  containerStyle={{ width: '45%', marginRight: 10 }}
                  btnContainerStyle={{ paddingTop: 20, paddingBottom: 0 }}
                  title={this.props.language.reject}
                  onPress={() => action === 'Sent' ? this.showQuoteDialog(true, false) : this.acceptQuote(false)}
                  type="outline"
                />
              </View>
            ) : null}
            {action === 'Finished' ? (
              <View style={{ flexDirection: 'column' }}>
                <View style={quoteStyles.statusBox}>
                  <Text style={quoteStyles.descriptionText}>Califíca tu satisfacción con el servicio</Text>
                </View>
                <Rating
                  ratingCount={5}
                  fractions={2}
                  startingValue={quote.rating ? +quote.rating : 0}
                  style={quoteStyles.ratingStyles}
                  imageSize={40}
                  ratingColor={appColors.primary}
                  onFinishRating={this.onRating}
                />
              </View>
            ) : null}
          </View>
          <Dialog
            title="Responder cotización"
            content={this.quoteDialog()}
            isVisible={this.state.showQuoteDialog}
            height={this.state.modalHeight}
            buttons={[{
              title: this.props.language.close,
              onPress: () => this.showQuoteDialog(false, false),
              style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
            }, {
              title: this.props.language.send,
              onPress: () => this.onSendInfo(true, true),
              style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.secondary },
            }]}
          />
        </ScrollView>
      </Container>
    );
  }
}

QuoteDetails.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(QuoteDetails);
