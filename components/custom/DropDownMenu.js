/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { commonStyles } from '../../styles/commonStyles';
import { appColors } from '../../styles/colors';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

const DropDownMenu = (props) => { 
  let textRef = React.createRef();
  let menuRef = null; 
 
  const setMenuRef = ref => menuRef = ref;
  const hideMenu = () => menuRef.hide();
  const showMenu = () => menuRef.show(textRef.current, stickTo = Position.BOTTOM_LEFT);
 
  const onPress = () => showMenu(); 
 
  return (
    <View style={{ position: 'absolute', top: 12, right: 20 }}>
      <Text
        ref={textRef}
        style={{ ...commonStyles.backBtnIconContainer, ...{ color: 'rgba(52, 52, 52, 0.1)'} }}
      >
          .
      </Text>
      <Icon
        type="simple-line-icons"
        name="settings"
        color={appColors.secondary}
        size={25}
        onPress={onPress}
      />

      <Menu ref={setMenuRef}>
        {
          props.options.map(x =>
            <React.Fragment key={x.text}>
              <MenuItem onPress={() => { x.onPress(); hideMenu(); }}>
                {x.text}
              </MenuItem>
              <MenuDivider />
            </React.Fragment>
          )
        }
      </Menu>
    </View>
  );
}

DropDownMenu.defaultProps = {
 
};

DropDownMenu.propTypes = {
  options: PropTypes.arrayOf({}).isRequired,
};

export default DropDownMenu;