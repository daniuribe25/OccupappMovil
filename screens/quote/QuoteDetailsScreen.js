/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Alert, ToastAndroid, TextInput, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import { CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import ImageView from 'react-native-image-view';
import PropTypes from 'prop-types';
import { getQuote, answerQuote } from '../../services/quoteServices';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { quoteStyles } from '../../styles/quoteStyles';
import QuoteCarousel from './components/QuoteCarousel';
import Dialog from '../../components/custom/Dialog';
import { appColors } from '../../styles/colors';

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
      formData: { ...prevState.formData, id: quote._id },
      quote,
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

    if (!data.accept) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    } else if (!data.observation || !data.price) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = () => {
    if (!this.validateForm(this.state.formData)) return;

    this.showLoader(true);
    answerQuote(this.state.formData)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) {
          Alert.alert('Error', resp.message);
          return;
        }
        this.props.navigation.navigate('ServiceList');
      }).catch(() => {
        ToastAndroid.show('Error 012', ToastAndroid.LONG);
      });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  showQuoteDialog = (show) => {
    this.setState(prevState => ({ ...prevState, showQuoteDialog: show }));
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
      <CheckBox
        title="Aceptar servicio"
        checked={this.state.formData.accept}
        onPress={() => this.setState(prevState => ({ ...prevState,
          modalHeight: prevState.formData.accept ? 60 : 240,
          formData: { ...prevState.formData, accept: !prevState.formData.accept },
        }))}
      />
      {this.state.formData.accept ? (
        <React.Fragment>
          <TextInput
            style={commonStyles.textInput}
            value={this.state.formData.price}
            placeholder={this.props.language.price}
            onChangeText={text => this.inputChangeHandler('price', text)}
          />
          <TextInput
            style={commonStyles.textInput}
            placeholder={this.props.language.observation}
            ref={(c) => { this.descriptionInput = c; }}
            value={this.state.formData.observation}
            onChangeText={text => this.inputChangeHandler('observation', text)}
            multiline
            numberOfLines={4}
          />
        </React.Fragment>
      ) : null}
    </View>
  );

  render() {
    const { quote, images, imageIndex, showImageViwer } = this.state;
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
        >
          <Loader show={this.state.showLoader} />
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 5 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>COTIZACIÓN</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <Text style={quoteStyles.descriptionText}>
              {this.props.language.quote_answer_text}
            </Text>
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
            <View style={{ marginVertical: 0, height: 100 }}>
              <BigButtonIcon
                btnStyle={{ flexBasis: '65%' }}
                btnContainerStyle={{ paddingTop: 20, paddingBottom: 0 }}
                text={this.props.language.answer_label}
                onPress={() => this.showQuoteDialog(true)}
              />
            </View>
          </View>
          <Dialog
            title="Responder cotización"
            content={this.quoteDialog()}
            isVisible={this.state.showQuoteDialog}
            height={this.state.modalHeight}
            buttons={[{
              title: 'Salir',
              onPress: () => this.showQuoteDialog(false),
              style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
            }, {
              title: 'Enviar',
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
