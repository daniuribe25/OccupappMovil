import React, { Component } from 'react';
import { View, Alert, ToastAndroid } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { storeLocally } from '../../services/handlers/commonServices';
import TextInputIcon from '../../components/custom/TextInputIcon';
import { authenticateUser, storeLoginInfo } from '../../redux/actions/session/loginActions';
import { getUserByEmail } from '../../services/loginServices';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';

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

  componentWillReceiveProps = (nextProps) => {
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

  loginRegister = () => {
    // if (!this.validateForm(this.state.formData)) return;

    if (!+this.state.formData.type) {
      this.showLoader(true);
      this.props.authenticateUser({
        email: this.state.formData.email,
        password: this.state.formData.password })
        .then(req => req.json())
        .then((resp) => {
          this.showLoader(false);
          if (!resp.success) {
            Alert.alert('Error', resp.message);
            return;
          }
          // storeLocally('user-data', this.state.formData);
          this.props.navigation.navigate('Tabs');
        }).catch(() => {
          ToastAndroid.show('Error 003', ToastAndroid.LONG);
        });
    } else {
      this.checkDuplicatedEmail();
    }
  }

  redirectToRegister = () => {
    this.props.storeLoginInfo(this.state.formData);
    this.props.navigation.push('RegisterInfo');
  }

  checkDuplicatedEmail = () => {
    this.showLoader(true);
    getUserByEmail(this.state.formData.email)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.success) {
          ToastAndroid.show('Email ya registrado, si no recuerdas la contraseña puedes recuperarla.', ToastAndroid.LONG);
        } else {
          this.redirectToRegister();
        }
      }).catch(() => {
        ToastAndroid.show('Error 003', ToastAndroid.LONG);
      });
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

  render() {
    return (
      <Container style={commonStyles.container}>
        <Loader show={this.state.showLoader} />
        {/* <BackButton onPress={() => this.props.navigation.navigate('Welcome')} /> */}
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
            iconName="medical"
            placeholder="password"
            onChangeText={text => this.inputChangeHandler('password', text)}
            value={this.state.formData.password}
            secureTextEntry
          />
          {+this.state.formData.type ? (
            <TextInputIcon
              iconName="medical"
              placeholder="confirm_password"
              onChangeText={text => this.inputChangeHandler('confirmPass', text)}
              value={this.state.formData.confirmPass}
              secureTextEntry
            />
          ) : null}
        </View>
        <BigButtonIcon
          iconName="arrow-forward"
          text={this.props.language[+this.state.formData.type ? 'next' : 'begin']}
          onPress={() => this.loginRegister()}
        />
      </Container>
    );
  }
}

LoginRegister.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
  loginInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
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
