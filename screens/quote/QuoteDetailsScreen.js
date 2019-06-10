/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Alert, ToastAndroid, TextInput, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import ImageView from 'react-native-image-view';
import PropTypes from 'prop-types';
import { getQuote, answerQuote } from '../../services/quoteServices';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { quoteStyles } from '../../styles/quoteStyles';
import QuoteCarousel from './components/QuoteCarousel';
import Dialog from '../../components/custom/Dialog';
import { appColors } from '../../styles/colors';
import { setQuoteTitle, setQuoteMessage } from './components/QuoteDescriptions';
import BackButton from '../../components/custom/BackButton';

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
  }

  componentWillMount() {
    this.fetchQuote();
  }

  setDateTime = (dateTime) => {
    if (dateTime) {
      const dt = dateTime.split('T');
      const date = dt[0].split('-');
      const time = dt[1].substring(0, 8);
      return `${date[2]}/${date[1]}/${date[0]} ${time}`;
    }
  }

  fetchQuote = () => {
    const q = this.props.navigation.getParam('quote');
    this.showLoader(true);
    getQuote(q._id)
      .then(res => res.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.success) this.setData(resp.output);
      });
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
      action: this.props.navigation.getParam('action'),
      formData: { ...prevState.formData,
        id: quote._id,
        sentBy: quote.sentBy._id,
        receivedBy: quote.receivedBy._id },
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

    if (data.accept && !(/^\d+$/.test(data.price))) {
      errorMessages.push('Precio no es un valor válido');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = () => {
    if (!this.validateForm(this.state.formData)) return;

    const data = this.state.formData;
    data.status = this.setFormState();

    this.showLoader(true);
    answerQuote(this.state.formData)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) { Alert.alert('Error', resp.message); return; }
        this.showQuoteDialog(false, true);

        Alert.alert('Info', 'Se ha enviado tu respuesta correctamente',
          [{ text: 'OK', onPress: () => this.props.navigation.navigate('Home') }],
          { cancelable: false });
      }).catch(() => {
        ToastAndroid.show('Error 013', ToastAndroid.LONG);
      });
  }

  acceptQuote = (accept) => {
    this.setState(prevState => ({ ...prevState,
      formData: { ...prevState.formData, accept },
    }));
    this.onSendInfo();
  }

  setFormState = () => {
    const { action, formData } = this.state;
    if (action === 'Sent' && formData.accept) return 'Answered';
    if (action === 'Sent' && !formData.accept) return 'Rejected';
    if (action !== 'Sent' && formData.accept) return 'Accepted';
    if (action !== 'Sent' && !formData.accept) return 'NoAccepted';
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
    const { quote, images, imageIndex, showImageViwer, action } = this.state;
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
            {setQuoteMessage(action, this.props.language, quote.price)}
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
                  onPress={() => action === 'Sent' ? this.showQuoteDialog(true, true) : this.acceptQuote(true)}
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
          </View>
          <Dialog
            title="Responder cotización"
            content={this.quoteDialog()}
            isVisible={this.state.showQuoteDialog}
            height={this.state.modalHeight}
            buttons={[{
              title: this.props.language.get_out,
              onPress: () => this.showQuoteDialog(false, false),
              style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
            }, {
              title: this.props.language.send,
              onPress: this.onSendInfo,
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
