/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Alert, ToastAndroid, TextInput, ScrollView, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, Text } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { quoteStyles } from '../../styles/quoteStyles';
import { appColors } from '../../styles/colors';
import QuoteCarousel from '../quote/components/QuoteCarousel';
import BackButton from '../../components/custom/BackButton';
import { fetchCategories, fetchServicesByCategory } from '../../services/serviceCategoriesServices';
import { registerService } from '../../services/userServicesServices';

class NewUserService extends Component {
  state = {
    formData: {
      description: '',
      service: '',
      user: this.props.loginInfo._id,
    },
    showLoader: false,
    media: [],
    categories: [],
    services: [],
    textCounter: 0,
  }

  componentDidMount = () => {
    this.fetchCategories();
    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        user: this.props.loginInfo._id,
      },
    }));
  }

  fetchCategories = () => {
    this.showLoader(true);
    fetchCategories()
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.success) {
          this.setState(prevState => ({
            ...prevState,
            categories: resp.output }));
        }
      }).catch(() => {
        this.showLoader(false);
        ToastAndroid.show('Error 020', ToastAndroid.LONG);
      });
  }

  fetchServices = (cat) => {
    this.showLoader(true);
    fetchServicesByCategory(cat)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.success) {
          this.setState(prevState => ({
            ...prevState,
            formData: { ...prevState.formData, category: cat },
            services: resp.output }));
        }
      }).catch(() => {
        this.showLoader(false);
        ToastAndroid.show('Error 020', ToastAndroid.LONG);
      });
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
    ImagePicker.launchImageLibrary(options, (response) => {
      this.showLoader(false);
      if (response.uri) {
        const { media } = this.state;
        media.push(response);
        this.setState(prevState => ({ ...prevState, media }));
      }
    });
  }

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];

    if (!data.description || !data.service || data.service === '0') {
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
    registerService(data)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) {
          Alert.alert('Error', resp.message);
        } else {
          Alert.alert('Info',
            'Servicio creado exitosamente.',
            [{ text: 'OK', onPress: () => this.props.navigation.navigate('Profile') }],
            { cancelable: false });
        }
      }).catch(() => {
        this.showLoader(false);
        ToastAndroid.show('Error 021', ToastAndroid.LONG);
      });
  }

  getFormatData = () => {
    const { formData, media } = this.state;
    const serviceMedia = media.map(x => ({
      uri: x.uri,
      type: x.type ? x.type : 'image/jpeg',
      name: x.fileName ? x.fileName : (new Date().valueOf()).toString(),
    }));
    formData.serviceMedia = serviceMedia;
    return formData;
  };

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

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
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 15 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>NUEVO SERVICIO</Text>
          </View>
          <View style={commonStyles.inputContainer}>
            <Picker
              selectedValue={this.state.formData.category}
              style={{ height: 50, width: '85%', paddingStart: 15, color: appColors.grey }}
              mode="dropdown"
              onValueChange={itemValue => this.fetchServices(itemValue)}
            >
              <Picker.Item label="Seleccione Categoria" value="0" />
              {this.state.categories.map(x => (
                <Picker.Item label={x.name} value={x._id} />
              ))}
            </Picker>
            <Picker
              selectedValue={this.state.formData.service}
              style={{ height: 50, width: '85%', paddingStart: 15, color: appColors.grey }}
              mode="dropdown"
              onValueChange={itemValue => this.setState(prevState => ({
                ...prevState,
                formData: { ...prevState.formData, service: itemValue } }))}
            >
              <Picker.Item label="Seleccione Servicio" value="0" />
              {this.state.services.map(x => (
                <Picker.Item label={x.name} value={x._id} />
              ))}
            </Picker>
            <Text style={quoteStyles.descriptionText}>
              {this.props.language['user_service_description_text']}
            </Text>
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
            <Text style={quoteStyles.descriptionText}>
              {this.props.language['user_service_media_text']}
            </Text>
            <View style={{ ...quoteStyles.mediaButtonsContainer, ...{ marginTop: 5 } }}>
              <Button
                type="outline"
                icon={{ type: 'font-awesome', name: 'camera', size: 35, color: appColors.secondary }}
                buttonStyle={quoteStyles.imagePickerBtnStyles}
                onPress={() => this.handleMediaFromGallery(true)}
              />
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
                text={this.props.language.save}
                onPress={() => this.onSendInfo()}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

NewUserService.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(NewUserService);
