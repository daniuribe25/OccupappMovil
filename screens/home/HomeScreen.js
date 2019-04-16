import React, { Component } from 'react';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';

class HomeScreen extends Component {
  
  render() {
    return (
      <Container style={commonStyles.container}>
        <Text>Daniel</Text>
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
