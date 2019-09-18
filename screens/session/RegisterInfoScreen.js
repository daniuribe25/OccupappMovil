/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Alert } from 'react-native';
import { Container, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import { storeLocally, handleException, compressImage } from '../../services/handlers/commonServices';
import { registerUserInfo } from '../../redux/actions/session/loginActions';
import { commonStyles } from '../../styles/commonStyles';
import TextInputIcon from '../../components/custom/TextInputIcon';
import DatePickerIcon from '../../components/custom/DatePickerIcon';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { appColors } from '../../styles/colors';
import { registerUser } from '../../services/loginServices';
import TextF from '../../components/custom/TextF';

class RegisterInfo extends Component {
  state = {
    formData: {
      ...{
        name: '',
        lastName: '',
        birthday: new Date(1900, 0, 1),
        cel: undefined,
        profileImage: null,
        loginType: 'CL', // common login
      },
      ...this.props.navigation.getParam('loginInfo'),
    },
    showLoader: false,
    textInputStyles: commonStyles.textInput,
    imagePickerBtnStyles: commonStyles.imagePickerBtn,
    imagePickerBtnTextStyles: commonStyles.imagePickerBtnText,
    registerType: this.props.navigation.getParam('type'),
  }

  setDate = (th, newDate) => {
    th.setState(prevState => (
      { ...prevState,
        formData: { ...prevState.formData, birthday: newDate },
      }
    ));
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (Object.keys(nextProps.userInfo).length > 0) {
      this.setState(prevState => ({
        ...prevState,
        formData: nextProps.userInfo,
      }));
    }
  }

  inputChangeHandler = (name, value) => {
    this.setState(prevState => (
      { ...prevState,
        formData: { ...prevState.formData, [name]: value },
      }
    ));
  };

  handleImageFromGallery = () => {
    const options = {};
    const { checked } = appColors;
    this.showLoader(true);
    ImagePicker.launchImageLibrary(options, async (response) => {
      this.showLoader(false);
      if (response.uri) {
        response = await compressImage(response.uri, 500, 420, 75);
        this.setState(prevState => (
          { ...prevState,
            imagePickerBtnStyles: {
              ...prevState.imagePickerBtnStyles,
              ...{ marginLeft: 20, borderColor: checked } },
            imagePickerBtnTextStyles: {
              ...prevState.imagePickerBtnTextStyles,
              color: checked },
            formData: { ...prevState.formData, profileImage: response },
          }
        ));
      }
    });
  }

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];

    if (((!data.name || !data.lastName) && this.state.registerType === 'CL')
    || data.birthday.getTime() === (new Date(1900, 0, 1)).getTime() || !data.cel) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    } else if (data.cel.length < 10 || !(/^\d+$/.test(data.cel))) {
      errorMessages.push('Debe ser un número celular válido');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = async () => {
    if (!this.validateForm(this.state.formData)) return;

    const data = this.getFormatData();
    try {
      this.showLoader(true);
      const req = await registerUser(data);
      const resp = await req.json();
      this.showLoader(false);
      this.props.registerUserInfo(data);
      if (!resp.success) {
        Alert.alert('Error', resp.message);
        return;
      }
      storeLocally('user-data', resp.output);
      this.props.navigation.navigate('TabsNavigator');
    } catch (err) { handleException('008', err, this); }
  }

  getFormatData = () => {
    const userInfo = this.state.formData;
    userInfo.birthday = userInfo.birthday instanceof Date ? (userInfo.birthday.toISOString()).substring(0, 10) : '';
    return {
      ...this.props.loginInfo,
      ...userInfo,
    };
  };

  setDefaultDate = () => {
    const dt = new Date(Date.now());
    dt.setDate(dt.getDate() - 6574);
    return dt;
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <Loader show={this.state.showLoader} />
        <View style={commonStyles.titleContainer}>
          <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</TextF>
        </View>

        <View style={commonStyles.inputContainer}>
          {this.state.registerType === 'CL' && (
            <React.Fragment>
              <TextInputIcon
                iconName="user"
                placeholder="name"
                value={this.state.formData.name}
                onChangeText={text => this.inputChangeHandler('name', text)}
                textContentType="givenName"
              />
              <TextInputIcon
                iconName="user"
                placeholder="last_name"
                value={this.state.formData.lastName}
                onChangeText={text => this.inputChangeHandler('lastName', text)}
                textContentType="familyName"
              />
            </React.Fragment>
          )}
          <DatePickerIcon
            onDateChange={newDate => this.setDate(this, newDate)}
            placeHolder={this.props.language.birthday}
            iconName="calendar"
            locale="es"
            maximumDate={this.setDefaultDate()}
            defaultDate={this.setDefaultDate()}
          />
          <TextInputIcon
            iconName="cellphone"
            iconType="material-community"
            placeholder="cel"
            value={this.state.formData.cel}
            onChangeText={text => this.inputChangeHandler('cel', text)}
            keyboardType="numeric"
            textContentType="telephoneNumber"
          />
          {this.state.registerType === 'CL' && (
            <View style={commonStyles.imagePickerContainer}>
              <Button
                bordered
                title=""
                style={this.state.imagePickerBtnStyles}
                onPress={() => this.handleImageFromGallery()}
              >
                <TextF
                  style={this.state.imagePickerBtnTextStyles}
                  uppercase={false}
                >
                  {this.props.language.pick_profile_image}
                </TextF>
              </Button>
              { this.state.formData.profileImage && (
                <View style={commonStyles.imagePickerShowedContainer}>
                  <Image
                    style={commonStyles.imagePickerShowed}
                    source={{ uri: this.state.formData.profileImage.uri }}
                  />
                </View>
              )}
            </View>
          )}
        </View>
        <BigButtonIcon
          iconName="arrow-forward"
          text={this.props.language.ready}
          onPress={() => this.onSendInfo()}
        />
      </Container>
    );
  }
}

RegisterInfo.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
  loginInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  registerUserInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
  userInfo: state.login.userInfo,
});

const mapDispachToProps = {
  registerUserInfo,
};

export default connect(mapStateToProps, mapDispachToProps)(RegisterInfo);
