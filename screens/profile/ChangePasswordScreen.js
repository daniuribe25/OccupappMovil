/* eslint-disable camelcase */
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleException } from '../../services/handlers/commonServices';
import { updatePassword } from '../../services/loginServices';
import { commonStyles } from '../../styles/commonStyles';
import TextInputIcon from '../../components/custom/TextInputIcon';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { appColors } from '../../styles/colors';
import BackButton from '../../components/custom/BackButton';
import TextF from '../../components/custom/TextF';

class ChangePassword extends Component {
  state = {
    formData: {},
    showLoader: false,
    textInputStyles: commonStyles.textInput,
    imagePickerBtnStyles: commonStyles.imagePickerBtn,
    imagePickerBtnTextStyles: commonStyles.imagePickerBtnText,
  }

  componentDidMount = () => {
    this.props.navigation.addListener(
      'didFocus',
      () => {
        const user = this.props.navigation.getParam('user');
        user.password = '';
        this.setState(prevState => (
          { ...prevState,
            formData: user }
        ));
      },
    );
  }

  inputChangeHandler = (name, value) => {
    this.setState(prevState => (
      { ...prevState,
        formData: { ...prevState.formData, [name]: value },
      }
    ));
  };

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];

    if (!data.password || !data.old_password || !data.confirm_password) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    } else if (!(/\d/.test(data.password) && /[a-zA-Z]/.test(data.password)) || data.password.length < 6) {
      errorMessages.push('Password debe contenter al menos 6 caracteres entre letras y números. Pensamos en tu seguridad ;)');
      isValid = false;
    } else if (data.password !== data.confirm_password) {
      errorMessages.push('Los password deben coincidir');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  onSendInfo = async () => {
    if (!this.validateForm(this.state.formData)) return;

    const data = (({ email, password, old_password }) => (
      { email, password, old_password }))(this.state.formData);
    this.showLoader(true);
    try {
      const req = await updatePassword(data, false);
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.success) {
        Alert.alert('Error', resp.message);
        return;
      }
      Alert.alert('Info', 'Se ha actualizado tu contraseña correctamente',
        [{ text: 'OK', onPress: () => this.props.navigation.navigate('Profile', { refresh: false }) }],
        { cancelable: false });
    } catch (err) { handleException('015', err, this); }
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <Loader show={this.state.showLoader} />
        <BackButton
          onPress={() => this.props.navigation.navigate('Profile', { refresh: false })}
          icon="arrow-left"
          color={appColors.primary}
          type="material-community"
        />
        <View style={commonStyles.titleContainer}>
          <TextF style={{ ...commonStyles.title, fontWeight: 'bold', fontSize: 15 }}>CAMBIAR CONTRASEÑA</TextF>
        </View>
        <View style={commonStyles.inputContainer}>
          <TextInputIcon
            placeholder="old_password"
            onChangeText={text => this.inputChangeHandler('old_password', text)}
            value={this.state.formData.old_password}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInputIcon
            placeholder="new_password"
            onChangeText={text => this.inputChangeHandler('password', text)}
            value={this.state.formData.password}
            secureTextEntry
            autoCapitalize="none"
          />
          <TextInputIcon
            placeholder="confirm_password"
            onChangeText={text => this.inputChangeHandler('confirm_password', text)}
            value={this.state.formData.confirm_password}
            secureTextEntry
          />
        
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

ChangePassword.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(ChangePassword);
