import React, { Component } from 'react';
import { Text, Container } from 'native-base';
import { Button, Icon } from 'react-native-elements';
import { View, Image, FlatList, Alert, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { removeFromStorage, getFromStorage } from '../../services/handlers/commonServices';
import { appColors } from '../../styles/colors';
import { profileStyles } from '../../styles/profileStyles';
import { serviceListStyles } from '../../styles/serviceListStyles';
import DropDownMenu from '../../components/custom/DropDownMenu';
import { getUserServices, disableService } from '../../services/userServicesServices';
import ListItem from './components/ListItem';
import Loader from '../../components/custom/Loader';

const nrImage = require('../../assets/images/no-records.png');

class Profile extends Component {
  state = {
    name: '',
    profileImage: '',
    user: {},
    myServices: [],
    showLoader: false,
  }

  componentDidMount = () => {
    this.props.navigation.addListener(
      'didFocus',
      () => { this.getUser(); },
    );
  }

  getUser = async () => {
    const userData = JSON.parse(await getFromStorage('user-data'));
    this.setState(prevState => ({
      ...prevState,
      user: userData,
    }));
    this.getMyServices();
  }

  getMyServices = () => {
    this.showLoader(true);
    getUserServices(this.state.user._id)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.output.length) {
          this.setState(prevState => ({
            ...prevState,
            myServices: resp.output,
          }));
        }
      }).catch(() => {
        ToastAndroid.show('Error 018', ToastAndroid.LONG);
      });
  }

  disableService = (service) => {
    this.showLoader(true);
    disableService(service)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        const myServices = this.state.myServices.map((x) => {
          if (x._id === service.id) {
            x.isActive = service.isActive;
          }
          return x;
        });
        if (resp.success) {
          Alert.alert('Info', `Servicio ${service.isActive ? '' : 'des'}activado.`);
          this.setState(prevState => ({ ...prevState, myServices }));
        }
      }).catch(() => {
        ToastAndroid.show('Error 019', ToastAndroid.LONG);
      });
  }

  logOut = () => {
    removeFromStorage('user-data');
    this.props.navigation.navigate('LoginNavigator');
  }

  getSettingOptions = () => {
    const options = [];
    if (this.state.user && this.state.user.loginType === 'CL') {
      options.push({ text: 'Cambiar Contraseña', onPress: () => this.props.navigation.navigate('ChangePassword', { user: this.state.user }) });
    }
    options.push({ text: 'Cerrar Sesión', onPress: this.logOut });
    return options;
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <DropDownMenu options={this.getSettingOptions()} />
        <Loader show={this.state.showLoader} />
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>PERFIL</Text>
        </View>

        <View style={profileStyles.profileImageNameContainer}>
          <View style={profileStyles.profileImageContainer}>
            <Image
              source={{ uri: this.state.user ? this.state.user.profileImage : '' }}
              style={profileStyles.profileImage}
            />
          </View>
          {this.state.user && (
            <Text h1 style={profileStyles.profileImageName}>
              {`${this.state.user.name} ${this.state.user.lastName}`}
            </Text>
          )}
          <Button
            rightIcon={{ name: 'code' }}
            title="Editar perfil"
            type="outline"
            buttonStyle={{ borderWidth: 2, borderColor: appColors.primary, height: 32 }}
            titleStyle={{ color: appColors.primary }}
            onPress={() => { this.props.navigation.navigate('EditProfile', { user: this.state.user }); }}
          />
        </View>

        <React.Fragment>
          <Text style={serviceListStyles.listTitle} h1>
            {this.props.language.my_services}
          </Text>
          {this.state.myServices.length ? (
            <FlatList
              data={this.state.myServices}
              renderItem={data => <ListItem data={data.item} navigation={this.props.navigation} disableService={this.disableService} />}
            />
          ) : (
            <View style={{ ...commonStyles.alertFullImageContainer, ...{ marginTop: 0, height: '40%' } }}>
              <Text h1 style={commonStyles.alertFullImageText}>
                Aún no tienes servicios configurados, configura tu primer servicio desde el botón de la parte inferior derecha de tu pantalla.
              </Text>
            </View>
          )}
        </React.Fragment>

        <View style={profileStyles.addServiceBtn}>
          <Icon
            reverse
            name="plus"
            type="font-awesome"
            color={appColors.secondary}
            raised
            onPress={() => this.props.navigation.navigate('NewUserService')}
          />
        </View>
      </Container>
    );
  }
}

Profile.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(Profile);
