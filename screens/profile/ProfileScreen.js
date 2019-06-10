import React, { Component } from 'react';
import { Text, Container, Button } from 'native-base';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sessionStyles } from '../../styles/sessionStyles';
import { commonStyles } from '../../styles/commonStyles';
import { removeFromStorage, getFromStorage } from '../../services/handlers/commonServices';
import { appColors } from '../../styles/colors';
import { profileStyles } from '../../styles/profileStyles';

class Profile extends Component {
  state = {
    name: '',
    profileImage: '',
  }

  componentDidMount = () => {
    this.getUser();
  }

  getUser = async () => {
    const userData = JSON.parse(await getFromStorage('user-data'));
    this.setState(prevState => ({
      ...prevState,
      name: `${userData.name} ${userData.lastName}`,
      profileImage: userData.profileImage,
    }));
  }

  logOut = () => {
    removeFromStorage('user-data');
    this.props.navigation.navigate('LoginNavigator');
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>PROFILE</Text>
        </View>

        <View style={profileStyles.profileImageNameContainer}>
          <View style={profileStyles.profileImageContainer}>
            <Image
              source={{ uri: this.state.profileImage }}
              style={profileStyles.profileImage}
            />
          </View>
          <Text h1 style={profileStyles.profileImageName}>
            {this.state.name}
          </Text>
        </View>

        <Button
          bordered
          style={sessionStyles.joinBtn}
          onPress={() => this.logOut()}
        >
          <Text
            style={sessionStyles.joinBtnText}
            uppercase={false}
          >
            {this.props.language['get_out']}
          </Text>
        </Button>
      </Container>
    );
  }
}

Profile.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
};

// Maps states and dispatches to props
const mapDispachToProps = {
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(Profile);
