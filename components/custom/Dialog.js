/* eslint-disable no-unused-expressions */
/* eslint-disable react/require-default-props */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import { appColors } from '../../styles/colors';
import TextF from './TextF';

class Dialog extends Component {

  renderButtons = () => (
    this.props.buttons.map(x => (
      <Button
        title={x.title}
        onPress={x.onPress}
        buttonStyle={x.style}
      />
    ))
  );

  render() {
    const { title, content, buttons, isVisible, height } = this.props;
    return (
      <Modal
        transparent
        isVisible={isVisible}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          backgroundColor: appColors.white,
          width: '100%',
          paddingTop: 15,
          paddingBottom: 25,
          paddingHorizontal: 30,
          borderRadius: 6,
        }}
        >
          {title ? (
            <View style={{ height: 40 }}>
              <TextF style={{ fontWeight: '500', fontSize: 22, color: appColors.primary }}>{title}</TextF>
            </View>
          ) : null}
          <View style={{ width: '100%', height }}>
            {content}
          </View>
          {buttons.length ? (
            <View style={{ height: 50, alignItems: 'flex-end', alignSelf: 'flex-end', flexDirection: 'row' }}>
              {this.renderButtons()}
            </View>
          ) : null}
        </View>
      </Modal>
    );
  }
}

Dialog.defaultProps = {
  title: null,
  buttons: [],
  height: 170,
};

Dialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.any.isRequired,
  buttons: PropTypes.any,
  isVisible: PropTypes.bool.isRequired,
  height: PropTypes.number,
};

export default Dialog;
