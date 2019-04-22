import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Alert } from 'react-native';
import { Container, Text, Button } from 'native-base';
import ImagePicker from 'react-native-image-picker';
import PropTypes from 'prop-types';
import { storeLocally } from '../../services/handlers/commonServices';
import { registerUserInfo } from '../../redux/actions/session/loginActions';
import { commonStyles } from '../../styles/commonStyles';
import TextInputIcon from '../../components/custom/TextInputIcon';
import DatePickerIcon from '../../components/custom/DatePickerIcon';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import { appColors } from '../../styles/colors';

class RegisterInfo extends Component {
  state = {
    formData: {
      name: '',
      lastName: '',
      birthday: new Date(),
      cel: undefined,
      profileImage: null,
    },
    textInputStyles: commonStyles.textInput,
    imagePickerBtnStyles: commonStyles.imagePickerBtn,
    imagePickerBtnTextStyles: commonStyles.imagePickerBtnText,
  }

  componentWillReceiveProps = (nextProps) => {
    if (Object.keys(nextProps.userInfo).length > 0) {
      this.setState(prevState => ({
        ...prevState,
        formData: nextProps.userInfo,
      }));
    }
  }

  setDate(newDate) {
    this.setState(prevState => (
      { ...prevState,
        formData: { ...prevState.formData, birthday: newDate },
      }
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
    const { checked } = appColors;
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.uri) {
        console.log(response);
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

    if (!data.name || !data.lastName || !data.birthday || !data.cel) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    }
    errorMessages.forEach(x => alert(x));
    return isValid;
  }

  onSendInfo = () => {
    if (!this.validateForm(this.state.formData)) return;

    const data = this.getFormatData();
    this.props.registerUserInfo(data)
      .then(req => req.json())
      .then((resp) => {
        if (!resp.success) {
          Alert.alert('Error', resp.message);
          return;
        }
        storeLocally('user-data', data);
        this.props.navigation.navigate('Tabs');
      }).catch((err) => {
        console.error(err);
      });
  }

  getFormatData = () => {
    const userInfo = this.state.formData;
    userInfo.birthday = userInfo.birthday instanceof Date ? (userInfo.birthday.toISOString()).substring(0, 10) : '';
    return {
      ...this.props.loginInfo,
      ...userInfo,
    };
  };

  render() {
    return (
      <Container style={commonStyles.container}>
        {/* <BackButton onPress={() => this.props.navigation.pop(1)} /> */}
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInputIcon
            iconName="person"
            placeholder="name"
            value={this.state.formData.name}
            onChangeText={text => this.inputChangeHandler('name', text)}
          />
          <TextInputIcon
            iconName="person"
            placeholder="last_name"
            value={this.state.formData.lastName}
            onChangeText={text => this.inputChangeHandler('lastName', text)}
          />
          <DatePickerIcon
            onDateChange={this.setDate}
            placeHolder={this.props.language.birthday}
            iconName="calendar"
            locale="es"
          />
          <TextInputIcon
            iconName="call"
            placeholder="cel"
            value={this.state.formData.cel}
            onChangeText={text => this.inputChangeHandler('cel', text)}
          />
          <View style={commonStyles.imagePickerContainer}>
            <Button
              bordered
              title=""
              style={this.state.imagePickerBtnStyles}
              onPress={() => this.handleImageFromGallery()}
            >
              <Text
                style={this.state.imagePickerBtnTextStyles}
                uppercase={false}
              >
                {this.props.language.pick_profile_image}
              </Text>
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
  userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
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
