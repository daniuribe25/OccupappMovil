/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Alert, ToastAndroid, TextInput, ScrollView, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Container } from 'native-base';
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
import { registerService, registerServiceMedia } from '../../services/userServicesServices';
import { compressImage, handleException } from '../../services/handlers/commonServices';
import TextF from '../../components/custom/TextF';

class NewUserService extends Component {
  state = {
    formData: {
      description: '',
      service: '',
      user: this.props.loginInfo._id,
    },
    showLoader: false,
    media: [],
    showMedia: [],
    categories: [],
    services: [],
    textCounter: 0,
  }

  componentDidMount = () => {
    const commingService = this.props.navigation.getParam('service');
    const user = this.props.navigation.getParam('user');
    let ser = {};
    if (commingService) {
      ser = {
        service: commingService.serviceId,
        category: commingService.categoryId,
        description: commingService.description,
        _id: commingService._id,
      };
      this.fetchServices(ser.category);
    }
    const media = commingService ? commingService.media.map(x => ({
      uri: x.url,
      publicId: x.publicId,
      isSaved: true,
    })) : [];
    this.fetchCategories();
    this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        ...ser,
        user: ser._id || user,
      },
      isSave: !commingService,
      media,
      showMedia: [...media],
    }));
  }

  fetchCategories = async () => {
    this.showLoader(true);
    try {
      const req = await fetchCategories();
      const resp = await req.json();
      this.showLoader(false);
      if (resp.success) {
        this.setState(prevState => ({
          ...prevState,
          categories: resp.output }));
      }
    } catch (err) { handleException('020', err, this); }
  }

  fetchServices = async (cat) => {
    this.showLoader(true);
    try {
      const req = await fetchServicesByCategory(cat);
      const resp = await req.json();
      this.showLoader(false);
      if (resp.success) {
        this.setState(prevState => ({
          ...prevState,
          formData: { ...prevState.formData, category: cat },
          services: resp.output }));
      }
    } catch (err) { handleException('020', err, this); }
  }

  inputChangeHandler = (name, value) => {
    const endValue = name === 'description' && this.state.formData.description.length === 500
      ? this.state.formData.description : value;
    this.setState(prevState => ({ ...prevState,
      formData: { ...prevState.formData, [name]: endValue },
      textCounter: prevState.formData.description.length,
    }));
  };

  handleMediaFromGallery = async (isImage) => {
    const options = { mediaType: isImage ? 'image' : 'video', noData: true, videoQuality: 'medium' };
    this.showLoader(true);
    ImagePicker.launchImageLibrary(options, async (response) => {
      this.showLoader(false);
      if (response.uri) {
        const { media, showMedia } = this.state;
        response = await compressImage(response.uri, 500, 420, 75);
        media.push(response);
        showMedia.push(response);
        this.setState(prevState => ({ ...prevState, media, showMedia }));
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
    if (!this.state.showMedia.length) {
      errorMessages.push('Debes cargar al menos una imagen.');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = async () => {
    if (!this.validateForm(this.state.formData)) return;
    this.showLoader(true);
    try {
      const req = await registerService(this.state.formData, this.state.isSave);
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.success) {
        Alert.alert('Error', resp.message);
      } else {
        this.showLoader(false);
        Alert.alert('Info',
          `Servicio ${this.state.isSave ? 'creado' : 'actualizado'} exitosamente.`,
          [{ text: 'OK', onPress: () => this.props.navigation.navigate('Profile', { refresh: true }) }],
          { cancelable: false });
        const data = this.getFormatData();
        data._id = this.state.isSave ? resp.output._id : data._id;
        registerServiceMedia(data, this.state.isSave);
      }
    } catch (err) { handleException('021', err, this); }
  }

  getFormatData = () => {
    const { formData, media } = this.state;
    formData.serviceMedia = media.filter(x => !x.isSaved).map(x => ({
      uri: x.uri,
      type: x.type ? x.type : 'image/jpeg',
      name: x.fileName ? x.fileName : (new Date().valueOf()).toString(),
    }));
    formData.mediaToRemove = JSON.stringify(media.filter(x => x.isRemoved).map(x => x.publicId));
    return formData;
  };

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  onRemoveImage = (uri) => {
    let media = this.state.media.map((x) => {
      if (x.uri === uri && x.isSaved) x.isRemoved = true;
      return x;
    });
    media = media.filter(x => x.uri !== uri || x.isSaved);
    const showMedia = this.state.showMedia.filter(x => x.uri !== uri);
    this.setState(prevState => ({ ...prevState, media, showMedia }));
  }

  render() {
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
        >
          <BackButton
            onPress={() => this.props.navigation.navigate('Profile', { refresh: false })}
            icon="arrow-left"
            color={appColors.primary}
            type="material-community"
          />
          <Loader show={this.state.showLoader} />
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 15 } }}>
            <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>NUEVO SERVICIO</TextF>
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
            <TextF style={quoteStyles.descriptionText}>
              {this.props.language['user_service_description_text']}
            </TextF>
            <TextInput
              style={quoteStyles.descriptionInput}
              ref={(c) => { this.descriptionInput = c; }}
              value={this.state.formData.description}
              onChangeText={text => this.inputChangeHandler('description', text)}
              multiline
              numberOfLines={4}
            />
            <TextF style={quoteStyles.textCounter}>
              {`${this.state.textCounter}/500 ${this.props.language['chars']}`}
            </TextF>
            <TextF style={quoteStyles.descriptionText}>
              {this.props.language['user_service_media_text']}
            </TextF>
            <View style={{ ...quoteStyles.mediaButtonsContainer, ...{ marginTop: 5 } }}>
              <Button
                type="outline"
                icon={{ type: 'font-awesome', name: 'camera', size: 35, color: appColors.secondary }}
                buttonStyle={quoteStyles.imagePickerBtnStyles}
                onPress={() => this.handleMediaFromGallery(true)}
              />
            </View>
            {this.state.showMedia.length ? (
              <View style={{ marginTop: 15, height: 170 }}>
                <QuoteCarousel media={this.state.showMedia} onRemove={this.onRemoveImage} />
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
  language: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(NewUserService);
