import React, { Component } from 'react';
import { Text, Container, Button } from 'native-base';
import { View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sessionStyles } from '../../styles/sessionStyles';
import { commonStyles } from '../../styles/commonStyles';
import { removeFromStorage } from '../../services/handlers/commonServices';

class Profile extends Component {

  logOut = () => {
    // removeFromStorage('user-data');
    this.props.navigation.navigate('LoadingAuth');
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
        </View>

        <View style={commonStyles.centerElement}>
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
        </View>
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