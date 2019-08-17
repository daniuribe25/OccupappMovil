/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Image, Alert, ToastAndroid } from 'react-native';
import { Container, Text, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { storeLocally, compressImage } from '../../services/handlers/commonServices';
import { registerUser } from '../../services/loginServices';
import { commonStyles } from '../../styles/commonStyles';
import TextInputIcon from '../../components/custom/TextInputIcon';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { appColors } from '../../styles/colors';
import BackButton from '../../components/custom/BackButton';

class EditProfile extends Component {
  state = {
    formData: {
      name: '',
      lastName: '',
      cel: undefined,
      profileImage: null,
    },
    showLoader: false,
    textInputStyles: commonStyles.textInput,
    imagePickerBtnStyles: commonStyles.imagePickerBtn,
    imagePickerBtnTextStyles: commonStyles.imagePickerBtnText,
  }

  componentDidMount = () => {
    const user = this.props.navigation.getParam('user');
    this.setState(prevState => (
      { ...prevState, formData: user }
    ));
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
    this.showLoader(true);
    ImagePicker.launchImageLibrary(options, async (response) => {
      this.showLoader(false);
      if (response.uri) {
        response.uri = await compressImage(response.uri, 480, 400, 80);
        this.setState(prevState => (
          { ...prevState,
            imagePicked: true,
            formData: { ...prevState.formData, profileImage: response },
          }
        ));
      }
    });
  }

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];

    if (!data.name || !data.lastName || !data.cel) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    } else if (data.cel.length < 10 || !(/^\d+$/.test(data.cel))) {
      errorMessages.push('Debe ser un número celular válido');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = () => {
    if (!this.validateForm(this.state.formData)) return;

    this.showLoader(true);
    registerUser(this.state.formData, true)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) {
          Alert.alert('Error', resp.message);
          return;
        }
        storeLocally('user-data', resp.output);
        Alert.alert('Info', 'Se ha actualizado tu información correctamente',
          [{ text: 'OK', onPress: () => this.props.navigation.navigate('Profile', { refresh: true }) }],
          { cancelable: false });
      }).catch(() => {
        ToastAndroid.show('Error 015', ToastAndroid.LONG);
      });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render() {
    const { formData, showLoader, imagePicked } = this.state;
    return (
      <Container style={commonStyles.container}>
        <Loader show={showLoader} />
        <BackButton
          onPress={() => this.props.navigation.navigate('Profile', { refresh: false })}
          icon="arrow-left"
          color={appColors.primary}
          type="material-community"
        />
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>EDITAR PERFIL</Text>
        </View>
        <View style={commonStyles.inputContainer}>
          <TextInputIcon
            iconName="user"
            placeholder="name"
            value={formData.name}
            onChangeText={text => this.inputChangeHandler('name', text)}
            textContentType="givenName"
          />
          <TextInputIcon
            iconName="user"
            placeholder="last_name"
            value={formData.lastName}
            onChangeText={text => this.inputChangeHandler('lastName', text)}
            textContentType="familyName"
          />
          <TextInputIcon
            iconName="cellphone"
            iconType="material-community"
            placeholder="cel"
            value={formData.cel}
            onChangeText={text => this.inputChangeHandler('cel', text)}
            keyboardType="numeric"
            textContentType="telephoneNumber"
          />
          <View style={commonStyles.imagePickerContainer}>
            <Button
              bordered
              style={{ ...this.state.imagePickerBtnStyles, ...{ marginLeft: 20 } }}
              onPress={() => this.handleImageFromGallery()}
            >
              <Text
                style={this.state.imagePickerBtnTextStyles}
                uppercase={false}
              >
                {this.props.language.pick_profile_image}
              </Text>
            </Button>
            { formData.profileImage !== '' && formData.profileImage !== undefined && (
              <View style={commonStyles.imagePickerShowedContainer}>
                <Image
                  style={commonStyles.imagePickerShowed}
                  source={{ uri: imagePicked ? formData.profileImage.uri : formData.profileImage }}
                />
              </View>
            )}
          </View>
        </View>
        <BigButtonIcon
          text={this.props.language.update}
          onPress={() => this.onSendInfo()}
        />
      </Container>
    );
  }
}

EditProfile.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  registerUserInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(EditProfile);
