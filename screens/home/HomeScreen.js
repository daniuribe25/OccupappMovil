import React, { Component } from 'react';
import { Container } from 'native-base';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';

class HomeScreen extends Component {
  
  render() {
    return (
      <Container style={commonStyles.container}>
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
        </View>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(HomeScreen);
