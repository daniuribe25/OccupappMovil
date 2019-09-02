/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { View, WebView, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import { appColors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';
import BackButton from '../../components/custom/BackButton';

class Payment extends PureComponent {
  state = {
    url: '',
  }

  componentDidMount = async () => {
    this.setState(prev => ({
      ...prev,
      url: this.props.navigation.getParam('paymentUrl'),
    }));
  }

  render() {
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          automaticallyAdjustContentInsets={false}
        >
          <BackButton
            onPress={() => this.props.navigation.navigate('Wallet')}
            icon="arrow-left"
            color={appColors.primary}
            type="material-community"
          />
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 5 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>PAGOS</Text>
          </View>
          <View style={{ flexGrow: 1 }}>
            {this.state.url && this.state.url !== '' ? (
              <React.Fragment>
                <WebView
                  automaticallyAdjustContentInsets={false}
                  source={{ uri: this.state.url }}
                  javaScriptEnabled
                  domStorageEnabled
                  decelerationRate="normal"
                  startInLoadingState
                />
                <KeyboardSpacer/>
              </React.Fragment>
            ) : null}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

export default Payment;
