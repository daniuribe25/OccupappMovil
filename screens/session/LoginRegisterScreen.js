import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInputIcon from '../../components/custom/TextInputIcon';
import { authenticateUser, storeLoginInfo } from '../../redux/actions/session/loginActions';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import { commonStyles } from '../../styles/commonStyles';

class LoginRegister extends Component {
  state = {
    modalVisible: false,
    modalMessage: '',
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

  loginRegister = () => {
    // if (!this.validateForm(this.state)) return;

    console.log('login   Register');
    if (!+this.state.formData.type) {
      this.props.authenticateUser({
        email: this.state.formData.email,
        password: this.state.formData.password })
        .then(req => req.json())
        .then((resp) => {
          if (!resp.success) {
            Alert.alert('Error', resp.message);
            return;
          }
          this.props.navigation.push('Tabs');
        }).catch((err) => {
          console.error(err);
        });
    } else {
      this.props.storeLoginInfo(this.state.formData);
      this.props.navigation.push('RegisterInfo');
    }
  }

  validateForm = (data) => {
    let isValid = true;
    const errorMessages = [];

    if (!data.email || !data.password) {
      errorMessages.push('Todos los campos son requeridos.');
      isValid = false;
    }
    if (+this.state.formData.type) {
      if (data.password !== data.confirmPass) {
        errorMessages.push('Los password deben coincidir');
        isValid = false;
      }
    }
    errorMessages.forEach(x => alert(x));
    return isValid;
  }

  render() {
    return (
      <Container style={commonStyles.container}>
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
