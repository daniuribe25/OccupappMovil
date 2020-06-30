import React, { Component } from 'react';
import { Button } from 'native-base';
import { View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { commonStyles } from '../../styles/commonStyles';
import { sessionStyles } from '../../styles/sessionStyles';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import TextF from '../../components/custom/TextF';

const backgroudSource = require('../../assets/images/background.jpg');

class Welcome extends Component {
  render() {
    return (
      <React.Fragment>
        <ImageBackground source={backgroudSource} style={{ width: '100%', height: '100%' }}>
          <View style={commonStyles.welcomeTitleContainer}>
            <TextF style={{ ...commonStyles.welcomeTitle, fontWeight: 'bold' }} h1>MOTORAPP</TextF>
          </View>
          <View style={sessionStyles.welcomeBtnsContainer}>
            <View style={sessionStyles.welcomeBtnsContent}>
              <BigButtonIcon
                text={this.props.language['continue']}
                btnStyle={{ flexBasis: '80%', justifyContent: 'center', borderRadius: 15 }}
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
                  <TextF
                    style={sessionStyles.joinBtnText}
                    uppercase={false}
                  >
                    {this.props.language['join']}
                  </TextF>
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
  navigation: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(Welcome);
