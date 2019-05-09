import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { getFromStorage } from '../../services/handlers/commonServices';
import { appColors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';

export default class LoadingAuth extends Component {
  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userData = await getFromStorage('user-data');
    this.props.navigation.navigate(!userData ? 'LoginNavigator' : 'TabsNavigator', { screenPropssss: this.props.navigation });
  };

  render() {
    return (
      <View style={commonStyles.centerElement}>
        <ActivityIndicator color={appColors.primary} style={{ zIndex: 100 }} size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
