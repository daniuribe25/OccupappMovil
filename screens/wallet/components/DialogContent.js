import React from 'react';
import { View, Text, Image, TouchableHighlight, TextInput } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { appColors } from '../../../styles/colors';
import { paymentListStyles } from '../../../styles/serviceListStyles';
import { commonStyles } from '../../../styles/commonStyles';
import TextInputIcon from '../../../components/custom/TextInputIcon';

export const openDialogContent = (showDialog, onDisburs, language, daviplata) => {
  let text = {};
  let buttons = [];
  if (daviplata) {
    text = <Text>Desea desembolsar su dinero</Text>;
    buttons = [{
      title: language.get_out,
      onPress: () => showDialog(false, null, null),
      style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
    }, {
      title: language.send,
      onPress: onDisburs,
      style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.secondary },
    }];
  } else {
    text = <Text>Primero debes vincular tu cuenta de daviplata para poder desembolsarte</Text>;
    buttons = [{
      title: language.get_out,
      onPress: () => showDialog(false, null, null),
      style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
    }];
  }
  showDialog(true, text, buttons);
};

export const openDaviDialogContent = (
  showDialog, onLinkDaviplata, language, onChangeText, value,
) => {
  const content = (
    <View>
      <Text>Ingresa el número celular que tienes vinculado a tu cuenta Daviplata para así poder realizarte los pagos</Text>
      <TextInputIcon
        placeholder="cel"
        value={value}
        onChangeText={text => onChangeText(text)}
        keyboardType="numeric"
        textContentType="telephoneNumber"
      />
    </View>
  );
  const buttons = [{
    title: language.get_out,
    onPress: () => showDialog(false, null, null),
    style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.primary },
  }, {
    title: language.send,
    onPress: onLinkDaviplata,
    style: { paddingHorizontal: 15, marginRight: 10, backgroundColor: appColors.secondary },
  }];
  showDialog(true, content, buttons);
};

export const billButton = onPress => (
  <View>
    <Button
      transparent
      style={paymentListStyles.billBtnIconContainer}
      onPress={() => onPress()}
    >
      <Icon
        type="font-awesome"
        name="money"
        style={commonStyles.backBtnIcon}
        color={appColors.primary}
        size={25}
      />
    </Button>
  </View>
);

export const daviBtnIcon = openLinkDaviplata => (
  <TouchableHighlight
    onPress={() => openLinkDaviplata()}
    underlayColor="white"
  >
    <Button
      transparent
      style={paymentListStyles.daviBtnIconContainer}
    >
      <Image
        source={require('../../../assets/images/dp.png')}
        style={paymentListStyles.daviBtnIcon}
      />
    </Button>
  </TouchableHighlight>
);
