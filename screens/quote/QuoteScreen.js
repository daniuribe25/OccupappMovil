/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Alert, ToastAndroid, TextInput, ScrollView, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerQuote } from '../../services/quoteServices';
import TextInputIcon from '../../components/custom/TextInputIcon';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { quoteStyles } from '../../styles/quoteStyles';
import { appColors } from '../../styles/colors';
import QuoteCarousel from './components/QuoteCarousel';
import BackButton from '../../components/custom/BackButton';
import { compressImage } from '../../services/handlers/commonServices';

class Quote extends Component {
  state = {
    formData: {
      description: '',
      dateTime: '',
      service: '',
      sentBy: this.props.loginInfo._id,
      receivedBy: '',
      location: '',
    },
    showLoader: false,
    showTimePicker: false,
    media: [],
    textCounter: 0,
  }

  setDate(newDate) {
    this.setState(prevState => (
      { ...prevState,
        formData: { ...prevState.formData, birthday: newDate },
      }
    ));
  }

  componentDidMount = () => {
    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        sentBy: this.props.loginInfo._id,
        receivedBy: this.props.navigation.getParam('userId'),
        service: this.props.navigation.getParam('serviceId'),
      },
    }));
  }

  inputChangeHandler = (name, value) => {
    const endValue = name === 'description' && this.state.formData.description.length === 500
      ? this.state.formData.description : value;
    this.setState(prevState => ({ ...prevState,
      formData: { ...prevState.formData, [name]: endValue },
      textCounter: prevState.formData.description.length,
    }));
  };

  handleMediaFromGallery = (isImage) => {
    const options = { mediaType: isImage ? 'image' : 'video', noData: true, videoQuality: 'medium' };
    this.showLoader(true);
    ImagePicker.launchImageLibrary(options, async (response) => {
      this.showLoader(false);
      if (response.uri) {
        const { media } = this.state;
        response.uri = await compressImage(response.uri, 500, 420, 75);
        media.push(response);
        this.setState(prevState => ({ ...prevState, media }));
      }
    });
  }

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];

    if (!data.description || !data.dateTime || !data.location) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = () => {
    if (!this.validateForm(this.state.formData)) return;

    const data = this.getFormatData();
    this.showLoader(true);
    registerQuote(data)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) {
          Alert.alert('Error', resp.message);
        } else {
          Alert.alert('Info',
            'Tu cotización se ha enviado exitosamente, te dejaremos saber tan pronto sea respondida.',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('Home') }],
            { cancelable: false });
        }
      }).catch(() => {
        this.showLoader(false);
        ToastAndroid.show('Error 011', ToastAndroid.LONG);
      });
  }

  getFormatData = () => {
    const { formData, media } = this.state;
    const quoteMedia = media.map(x => ({
      uri: x.uri,
      type: x.type ? x.type : 'image/jpeg',
      name: x.fileName ? x.fileName : (new Date().valueOf()).toString(),
    }));
    formData.quoteMedia = quoteMedia;
    return formData;
  };

  setDefaultDate = () => {
    const dt = new Date(Date.now());
    dt.setDate(dt.getDate() - 6574);
    return dt;
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  showHideDateTimePicker = (show) => {
    Keyboard.dismiss();
    this.setState({ showTimePicker: show });
  };

  setZeroToTime = value => value < 10 ? `0${value}` : value;

  handleDatePicked = (date) => {
    const day = this.setZeroToTime(date.getDate());
    const month = this.setZeroToTime(date.getMonth() + 1);
    const hours = this.setZeroToTime(date.getHours());
    const minutes = this.setZeroToTime(date.getMinutes());
    const dateTime = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:00`;
    this.setState(prevState => ({ ...prevState,
      formData: {
        ...prevState.formData,
        dateTime,
      },
    }));
    this.descriptionInput.focus();
  };

  render() {
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
        >
          <BackButton
            onPress={() => this.props.navigation.goBack()}
            icon="arrow-left"
            color={appColors.primary}
            type="material-community"
          />
          <Loader show={this.state.showLoader} />
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 5 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>COTIZAR</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <TextInputIcon
              iconName="calendar"
              placeholder="service_datetime"
              value={this.state.formData.dateTime}
              onChangeText={() => {}}
              onFocus={() => this.showHideDateTimePicker(true)}
            />
            <Text style={quoteStyles.descriptionText}>
              {this.props.language['quote_description_text']}
            </Text>
            <DateTimePicker
              isVisible={this.state.showTimePicker}
              onConfirm={this.handleDatePicked}
              onCancel={() => this.showHideDateTimePicker(false)}
              mode="datetime"
              minimumDate={new Date()}
            />
            <TextInput
              style={quoteStyles.descriptionInput}
              ref={(c) => { this.descriptionInput = c; }}
              value={this.state.formData.description}
              onChangeText={text => this.inputChangeHandler('description', text)}
              multiline
              numberOfLines={4}
            />
            <Text style={quoteStyles.textCounter}>
              {`${this.state.textCounter}/500 ${this.props.language['chars']}`}
            </Text>
            <TextInputIcon
              ref={(c) => { this.locationInput = c; }}
              iconName="map-marker"
              placeholder="location"
              value={this.state.formData.location}
              onChangeText={text => this.inputChangeHandler('location', text)}
              textContentType="addressCity"
            />
            <View style={quoteStyles.mediaButtonsContainer}>
              <Button
                type="outline"
                icon={{ type: 'font-awesome', name: 'camera', size: 35, color: appColors.secondary }}
                buttonStyle={quoteStyles.imagePickerBtnStyles}
                onPress={() => this.handleMediaFromGallery(true)}
              />
              {/* <Button
                type="outline"
                icon={{ type: 'material-community', name: 'video', size: 50, color: appColors.secondary }}
                buttonStyle={quoteStyles.imagePickerBtnStyles}
                onPress={() => this.handleMediaFromGallery(false)}
              /> */}
            </View>
            {this.state.media.length ? (
              <View style={{ marginTop: 15, height: 170 }}>
                <QuoteCarousel media={this.state.media} />
              </View>
            ) : null}
            <View style={{ marginVertical: 0, height: 100 }}>
              <BigButtonIcon
                btnStyle={{ flexBasis: '65%' }}
                btnContainerStyle={{ paddingTop: 20, paddingBottom: 0 }}
                text={this.props.language.quote_now}
                onPress={() => this.onSendInfo()}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

Quote.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(Quote);
