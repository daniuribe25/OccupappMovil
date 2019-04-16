import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextInputIcon from '../../components/custom/TextInputIcon';
import { storeLoginInfo } from '../../redux/actions/session/loginActions';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import { commonStyles } from '../../styles/commonStyles';

class LoginRegister extends Component {
  state = {
    type: +this.props.navigation.getParam('type'),
    email: '',
    password: '',
    confirmPass: '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (Object.keys(nextProps.loginInfo).length > 0) {
      this.setState(nextProps.loginInfo);
    }
  }

  inputChangeHandler = (name, value) => {
    this.setState(prevState => (
      { ...prevState, [name]: value }
    ));
  };

  loginRegister = () => {
    // if (!this.validateForm(this.state)) return;
    console.log('login   Register');
    this.props.storeLoginInfo(this.state);

    if (+this.state.type) {
      this.props.navigation.push('RegisterInfo');
    } else {
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
    if (+this.state.type) {
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
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
        </View>

        <View style={commonStyles.inputContainer}>
          <TextInputIcon
            iconName="at"
            placeholder="email"
            value={this.state.email}
            onChangeText={text => this.inputChangeHandler('email', text)}
          />
          <TextInputIcon
            iconName="medical"
            placeholder="password"
            onChangeText={text => this.inputChangeHandler('password', text)}
            value={this.state.password}
            secureTextEntry
          />
          {+this.state.type ? (
            <TextInputIcon
              iconName="medical"
              placeholder="confirm_password"
              onChangeText={text => this.inputChangeHandler('confirmPass', text)}
              value={this.state.confirmPass}
              secureTextEntry
            />
          ) : null}
        </View>
        <BigButtonIcon
          iconName="arrow-forward"
          text={this.props.language[+this.state.type ? 'next' : 'begin']}
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
  storeLoginInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

const mapDispachToProps = {
  storeLoginInfo,
};

export default connect(mapStateToProps, mapDispachToProps)(LoginRegister);
