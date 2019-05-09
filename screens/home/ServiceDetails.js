/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { servicesStyles } from '../../styles/servicesStyles';
import { appColors } from '../../styles/colors';
import BackButton from '../../components/custom/BackButton';
import BigButtonIcon from '../../components/custom/BigButtonIcon';

const horizontalMargin = 0;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth + horizontalMargin * 2;
const itemHeight = 230;

const styles = StyleSheet.create({
  slide: { width: itemWidth, height: itemHeight, flexGrow: 1, justifyContent: 'center' },
  slideInnerContainer: { width: sliderWidth },
});

class ServiceDetails extends Component {
  state = {
    service: this.props.navigation.getParam('service'),
  }

  renderItem = () => {
    const { media, name, service, rating, description } = this.state.service;
    return (
      <View style={{ ...styles.slide, ...servicesStyles.slide }}>
        <View style={{ ...styles.slideInnerContainer, ...servicesStyles.slideInnerContainer }}>
          <Image source={{ uri: media[0] }} style={servicesStyles.image} />
          <View style={servicesStyles.titleContainer}>
            <View style={servicesStyles.serviceNamePanel}>
              <Text style={servicesStyles.serviceText}>{ service }</Text>
              <Text style={servicesStyles.userNameText}>{ name }</Text>
            </View>
            <View style={servicesStyles.ratingPanel}>
              <Text style={servicesStyles.ratingText}>{rating}</Text>
              <Icon
                style={servicesStyles.ratingIcon}
                name="star"
                size={18}
                color={appColors.primary}
              />
            </View>
          </View>
          <View style={servicesStyles.descriptionContainer}>
            <Text style={servicesStyles.descriptionText}>{description}</Text>
          </View>
          <BigButtonIcon
            text={this.props.language['quote']}
            btnStyle={{ flexBasis: '75%', justifyContent: 'center', borderRadius: 20, marginTop: -20 }}
            onPress={() => Alert.alert('Información', 'Viene pronto')}
          />
        </View>
      </View>
    );
  }

  render = () => {
    return (
      <View>
        <BackButton onPress={() => this.props.navigation.goBack()} />
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', alignContent: 'center', flexDirection: 'row', width: '100%' }}>
          {this.renderItem()}
        </View>
      </View>
    );
  }
}

ServiceDetails.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(ServiceDetails);
