import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInputIcon from '../../components/custom/TextInputIcon';
import { recoverPassword } from '../../services/loginServices';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { handleException } from '../../services/handlers/commonServices';
import { commonStyles } from '../../styles/commonStyles';
import BackButton from '../../components/custom/BackButton';
import { appColors } from '../../styles/colors';
import TextF from '../../components/custom/TextF';

class RememberPassword extends Component {
  state = {
    showLoader: false,
    formData: { email: '' },
  }

  inputChangeHandler = (name, value) => {
    this.setState(prevState => (
      { ...prevState,
        formData: { ...prevState.formData, [name]: value },
      }
    ));
  };

  recoverPassword = async () => {
    if (!this.validateForm(this.state.formData)) return;

    this.showLoader(true);
    try {
      const req = await recoverPassword(this.state.formData.email);
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.success) {
        Alert.alert('Error', resp.message);
      } else {
        Alert.alert(
          'Listo',
          'Se ha enviado un email con tu nueva contraseña, por favor después de ingresar cambiala desde la opción de ajustes',
          [{ text: 'OK', onPress: () => this.props.navigation.goBack() }],
        );
      }
    } catch (err) { handleException('006', err, this); }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];
    if (!this.validateEmail(data.email)) {
      errorMessages.push('Por favor introduce un email válido');
      isValid = false;
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <Loader show={this.state.showLoader} />
        <BackButton
          onPress={() => this.props.navigation.goBack()}
          icon="arrow-left"
          color={appColors.primary}
          type="material-community"
        />
        <View style={commonStyles.titleContainer}>
          <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>{this.props.language['recover_pass']}</TextF>
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInputIcon
            iconName="at"
            placeholder="email"
            value={this.state.formData.email}
            onChangeText={text => this.inputChangeHandler('email', text)}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
        </View>
        <BigButtonIcon
          text={this.props.language['recover']}
          onPress={() => this.recoverPassword()}
          btnContainerStyle={{ paddingTop: 40, paddingBottom: 15 }}
        />
      </Container>
    );
  }
}

RememberPassword.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps, null)(RememberPassword);
