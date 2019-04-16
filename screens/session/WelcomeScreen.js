import React, { Component } from 'react';
import { Text, Button } from 'native-base';
import { View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { sessionStyles } from '../../styles/sessionStyles';
import AppContext from '../../AppContext';
import BigButtonIcon from '../../components/custom/BigButtonIcon';

const backgroudSource = require('../../assets/images/background.jpg');

class Welcome extends Component {
  render() {
    return (
      <React.Fragment>
        <ImageBackground source={backgroudSource} style={{ width: '100%', height: '100%' }}>
          <View style={commonStyles.welcomeTitleContainer}>
            <Text style={{ ...commonStyles.welcomeTitle, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
          </View>
          <View style={sessionStyles.welcomeBtnsContainer}>
            <View style={sessionStyles.welcomeBtnsContent}>
              <BigButtonIcon
                text={this.props.language['continue']}
                btnStyle={{ flexBasis: '80%', justifyContent: 'center', borderRadius: 30 }}
                onPress={() => this.props.navigation.navigate('LoginRegister', { type: 0 })}
              />
            </View>
            <View style={sessionStyles.welcomeBtnsContent}>
              <View style={sessionStyles.btnBorder}>
                <Button
                  bordered
                  style={sessionStyles.joinBtn}
                  onPress={() => this.props.navigation.navigate('LoginRegister', { type: 1 })}
                >
                  <Text
                    style={sessionStyles.joinBtnText}
                    uppercase={false}
                  >
                    {this.props.language['join']}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </ImageBackground>
      </React.Fragment>
    );
  }
}

Welcome.propTypes = {
  language: PropTypes.objectOf(PropTypes.string).isRequired,
};

// Maps states and dispatches to props
const mapDispachToProps = {
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(Welcome);
