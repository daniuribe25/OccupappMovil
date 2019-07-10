/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, Switch, Alert } from 'react-native';
import { Rating } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { serviceListStyles, paymentListStyles } from '../../../styles/serviceListStyles';
import { appColors } from '../../../styles/colors';
import { profileStyles } from '../../../styles/profileStyles';

class ListItem extends Component {

  modifyState = (isActive) => {
    this.props.disableService({ id: this.props.data._id, isActive });
  }

  disableUserService = (value) => {
    if (!value) {
      Alert.alert('Alerta', '¿Deseas desactivar este servicio? Los demas usuarios no podrán verlo',
        [{ text: 'Aceptar', onPress: () => this.modifyState(value) },
          { text: 'Salir', onPress: () => {} }],
        { cancelable: false });
    } else this.modifyState(value);
  }

  render() {
    const { data } = this.props;
    return (
      <LinearGradient
        colors={[appColors.white, '#f4f4f4']}
        style={{ ...serviceListStyles.itemContainer, ...{ marginVertical: 2 } }}
      >
        <View style={paymentListStyles.textSection}>
          <Text style={paymentListStyles.itemTitle}>{data.service}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Rating
              ratingCount={5}
              readonly
              fractions={2}
              startingValue={+data.rating}
              style={profileStyles.ratingStyles}
              imageSize={15}
              ratingColor={appColors.primary}
            />
            <Text style={profileStyles.ratingText}>{+data.rating}</Text>
          </View>
        </View>
        <View style={profileStyles.optionsSection}>
          <Switch
            style={{ top: 15 }}
            value={data.isActive}
            onValueChange={value => this.disableUserService(value)}
          />
        </View>
      </LinearGradient>
    );
  }
}

export default ListItem;
