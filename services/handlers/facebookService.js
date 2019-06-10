import React, { PureComponent } from 'react';
import FBSDK from 'react-native-fbsdk';
import { Text, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Icon } from 'react-native-elements';
import { View, ToastAndroid } from 'react-native';
import { sessionStyles } from '../../styles/sessionStyles';
import { appColors } from '../../styles/colors';

const { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } = FBSDK;


class FacebookButton extends PureComponent {
  constructor() {
    super();
    this.requestManager = new GraphRequestManager();
  }

  fetchProfile = async accessToken => new Promise((resolve, reject) => {
    const request = new GraphRequest(
      '/me',
      {
        accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name',
          },
        },
      },
      (error, result) => {
        if (result) {
          const profile = result;
          profile.profileImage = `https://graph.facebook.com/${result.id}/picture?type=large`;
          resolve(profile);
        } else {
          reject(error);
        }
      },
    );

    this.requestManager.addRequest(request).start();
  });

  formatBirthday = (fbBirthday) => {
    let birthday = '';
    if (fbBirthday) {
      const arr = fbBirthday.split('/');
      birthday = `${arr[2]}-${arr[1]}-${arr[0]}`;
    }
    return birthday;
  }

  formatUserData = userData => ({
    loginType: 'FB',
    name: userData.first_name,
    lastName: userData.last_name,
    // birthday: this.formatBirthday(userData.birthday),
    email: userData.email,
    profileImage: userData.profileImage,
  });

  handleFacebookLogin = () => {
    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      (result) => {
        if (result.isCancelled) {
          ToastAndroid.show('Login con facebook cancelado', ToastAndroid.LONG);
        } else {
          AccessToken.getCurrentAccessToken().then(
            (data) => {
              console.log(`login success with permissions: ${result.grantedPermissions.toString()} and accessToken = ${data.accessToken}`);
              this.fetchProfile(data.accessToken).then((resp) => {
                const userData = this.formatUserData(resp);
                this.props.login(userData);
              });
            },
          );
        }
      },
      () => {
        ToastAndroid.show('005', ToastAndroid.LONG);
      },
    ).catch(err => ToastAndroid.show(err, ToastAndroid.LONG));
  }

  render = () => (
    <View style={sessionStyles.fbBtnsContent}>
      <View style={sessionStyles.fbBtnBorder}>
        <Button
          bordered
          style={sessionStyles.fbBtn}
          onPress={() => this.handleFacebookLogin()}
          iconRight
        >
          <Text
            style={sessionStyles.fbBtnText}
            uppercase={false}
          >
            {this.props.language['facebook_button']}
          </Text>
          <Icon
            name="facebook-square"
            color={appColors.fb}
            type="FontAwesome"
            fontSize={50}
            style={{ fontSize: 33 }}
            reverse
          />
        </Button>
      </View>
    </View>
  );
}

FacebookButton.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps, null)(FacebookButton);


class FacebookService {
  

  makeLogoutButton = (callback) => {
    return (
      <LoginButton onLogoutFinished={() => {
        callback();
      }}
      />
    );
  }
}

export const facebookService = new FacebookService();
