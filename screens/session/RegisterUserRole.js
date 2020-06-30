/* eslint-disable camelcase */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Alert } from 'react-native';
import { Container, Radio, Right, Left } from 'native-base';
import PropTypes from 'prop-types';
import { storeLoginInfo } from '../../redux/actions/session/loginActions';
import { commonStyles } from '../../styles/commonStyles';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import Loader from '../../components/custom/Loader';
import { appColors } from '../../styles/colors';
import TextF from '../../components/custom/TextF';

class RegisterUserRole extends Component {
  state = {
    formData: {
      ...this.props.navigation.getParam('loginInfo'),
      role: 'Seller',
    },
    showLoader: false,
    registerType: this.props.navigation.getParam('type'),
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  onSendInfo = () => {
    this.props.storeLoginInfo(this.state.formData);
    this.props.navigation.push('RegisterInfo', { type: this.state.registerType, loginInfo: this.state.formData });
  }

  setRole = role => this.setState(prev => ({ ...prev, formData: { ...prev.formData, role } }));

  render() {
    return (
      <Container style={commonStyles.container}>
        <Loader show={this.state.showLoader} />
        <View style={commonStyles.titleContainer}>
          <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>MOTORAPP</TextF>
        </View>
        <View style={{ padding: 20, paddingTop: 50, paddingLeft: 50 }}>
          <View style={{
            flexDirection: 'row',
            borderBottomColor: appColors.lightGrey,
            borderBottomWidth: 1,
            paddingVertical: 10,
          }}
          >
            <Radio
              color={appColors.secondary}
              selectedColor={appColors.secondary}
              style={{ width: 40 }}
              selected={this.state.formData.role === 'Buyer'}
              onPress={() => this.setRole('Buyer')}
            />
            <TextF
              style={{ flex: 1, fontSize: 23, top: -7 }}
              onPress={() => this.setRole('Buyer')}
            >
              Soy Vendedor
            </TextF>
          </View>
          <View style={{
            flexDirection: 'row',
            paddingVertical: 17 }}
          >
            <Radio
              color={appColors.secondary}
              selectedColor={appColors.secondary}
              style={{ width: 40 }}
              selected={this.state.formData.role === 'Seller'}
              onPress={() => this.setRole('Seller')}
            />
            <TextF
              onPress={() => this.setRole('Seller')}
              style={{ flex: 1, fontSize: 23, top: -7 }}
            >
              Soy Comprador
            </TextF>
          </View>
        </View>
        <BigButtonIcon
          iconName="arrow-forward"
          text={this.props.language.next}
          onPress={() => this.onSendInfo()}
        />
      </Container>
    );
  }
}

RegisterUserRole.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  storeLoginInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
  userInfo: state.login.userInfo,
});

const mapDispachToProps = {
  storeLoginInfo,
};

export default connect(mapStateToProps, mapDispachToProps)(RegisterUserRole);
