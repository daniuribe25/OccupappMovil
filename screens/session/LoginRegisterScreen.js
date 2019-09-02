/* eslint-disable camelcase */
/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { storeLocally, handleException } from '../../services/handlers/commonServices';
import FacebookButton from '../../services/handlers/facebookService';
import TextInputIcon from '../../components/custom/TextInputIcon';
import { authenticateUser, storeLoginInfo } from '../../redux/actions/session/loginActions';
import { getUserByEmail, authUser } from '../../services/loginServices';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { sessionStyles } from '../../styles/sessionStyles';

class LoginRegister extends Component {
  state = {
    showLoader: false,
    formData: {
      type: +this.props.navigation.getParam('type'),
      email: '',
      password: '',
      confirmPass: '',
    },
  }

  UNSAFE_componentWillReceiveProps = (nextProps) => {
    if (Object.keys(nextProps.loginInfo).length > 0) {
      this.setState(prevState => ({
        ...prevState,
        formData: nextProps.loginInfo,
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

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  loginRegister = async () => {
    if (!this.validateForm(this.state.formData)) return;

    if (!+this.state.formData.type) {
      try {
        this.showLoader(true);
        const loginInfo = {
          email: this.state.formData.email,
          password: this.state.formData.password,
          loginType: 'CL',
        };
        const req = await authUser(loginInfo);
        const resp = await req.json();
        this.showLoader(false);
        if (!resp.success) {
          Alert.alert('Error', resp.message);
          return;
        }
        this.props.authenticateUser(loginInfo);
        storeLocally('user-data', resp.output);
        this.props.navigation.navigate('TabsNavigator');
      } catch (err) { handleException('003', err, this); }
    } else {
      this.checkDuplicatedEmail();
    }
  }

  facebookLogin = async (user) => {
    this.showLoader(true);
    try {
      const req = await this.props.authenticateUser(user);
      const resp = await req.json();
      this.showLoader(false);
      if (!resp.success) {
        this.redirectToRegister('FB', user);
      } else {
        storeLocally('user-data', resp.output);
        this.props.navigation.navigate('TabsNavigator');
      }
    } catch (err) { handleException('007', err, this); }
  }

  redirectToRegister = (type, loginInfo) => {
    this.props.storeLoginInfo(loginInfo);
    this.props.navigation.push('RegisterInfo', { type, loginInfo });
  }

  checkDuplicatedEmail = async () => {
    this.showLoader(true);
    try {
      const req = await getUserByEmail(this.state.formData.email);
      const resp = await req.json();
      this.showLoader(false);
      if (resp.success) {
        let mess = '';
        mess = resp.output.loginType === 'FB'
          ? 'Email ya registrado en Occupapp con una cuenta de facebook, por favor intenta logandote desde esta opción'
          : 'Email ya registrado, si no recuerdas la contraseña puedes recuperarla.';
        Alert.alert('Información', mess);
      } else {
        this.redirectToRegister('CL', this.state.formData);
      }
    } catch (err) { handleException('003', err, this); }
  }

  validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];
    if (!data.email || !data.password) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    }
    if (+this.state.formData.type) {
      if (!this.validateEmail(data.email)) {
        errorMessages.push('No es un email válido');
        isValid = false;
      }
      if (data.password !== data.confirmPass) {
        errorMessages.push('Los password deben coincidir');
        isValid = false;
      }
      if (!(/\d/.test(data.password) && /[a-zA-Z]/.test(data.password)) || data.password.length < 6) {
        errorMessages.push('Password debe contenter al menos 6 caracteres entre letras y números. Pensamos en tu seguridad ;)');
        isValid = false;
      }
    }
    errorMessages.forEach(x => Alert.alert('Error', x));
    return isValid;
  }

  rememberPass = () => {
    this.props.navigation.push('RememberPassword');
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <Loader show={this.state.showLoader} />
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUAPP</Text>
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
          <TextInputIcon
            iconName="asterisk"
            placeholder="password"
            onChangeText={text => this.inputChangeHandler('password', text)}
            value={this.state.formData.password}
            secureTextEntry
          />
          {+this.state.formData.type ? (
            <TextInputIcon
              iconName="asterisk"
              placeholder="confirm_password"
              onChangeText={text => this.inputChangeHandler('confirmPass', text)}
              value={this.state.formData.confirmPass}
              secureTextEntry
            />
          ) : null}
        </View>
        <BigButtonIcon
          iconName="sign-in"
          iconType="FontAwesome"
          text={this.props.language[+this.state.formData.type ? 'next' : 'begin']}
          onPress={() => this.loginRegister()}
          btnContainerStyle={{ paddingTop: 40, paddingBottom: 15 }}
        />
        {!+this.state.formData.type && (
          <View style={sessionStyles.rememberPasswordLink}>
            <Text style={sessionStyles.rememberPasswordLinkText} onPress={() => this.rememberPass()}>
              {this.props.language['recover_pass']}
            </Text>
          </View>
        )}
        <View style={{ ...sessionStyles.welcomeBtnsContainer, ...{ bottom: 30 } }}>
          <View style={sessionStyles.continueWith}>
            <Text style={sessionStyles.continueWithText}>
              {this.props.language[+this.state.formData.type ? 'register_with' : 'continue_with']}
            </Text>
          </View>
          <FacebookButton login={this.facebookLogin} />
        </View>
      </Container>
    );
  }
}

LoginRegister.propTypes = {
  language: PropTypes.shape(PropTypes.string).isRequired,
  loginInfo: PropTypes.shape(PropTypes.any).isRequired,
  navigation: PropTypes.shape(PropTypes.any).isRequired,
  authenticateUser: PropTypes.func.isRequired,
  storeLoginInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

const mapDispachToProps = {
  authenticateUser,
  storeLoginInfo,
};

export default connect(mapStateToProps, mapDispachToProps)(LoginRegister);
