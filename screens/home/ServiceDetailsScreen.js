/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Lightbox from 'react-native-lightbox';
import Carousel from 'react-native-looped-carousel';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { servicesStyles } from '../../styles/servicesStyles';
import { appColors } from '../../styles/colors';
import BackButton from '../../components/custom/BackButton';
import BigButtonIcon from '../../components/custom/BigButtonIcon';
import FloatIcon from '../../components/custom/FloatIcon';

const sliderWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  slide: { width: sliderWidth, height: 230, flexGrow: 1, justifyContent: 'center' },
  slideInnerContainer: { width: sliderWidth },
});

class ServiceDetails extends Component {
  state = {
    service: this.props.navigation.getParam('service'),
  }

  renderGalleryCarousel = () => {
    const { media } = this.state.service;
    return (
      <Carousel style={{ width: sliderWidth, height: sliderWidth }}>
        {media.map(x => <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: x }} />)}
      </Carousel>
    );
  };

  renderImage = media => (
    <Lightbox springConfig={{ tension: 15, friction: 7 }} swipeToDismiss={false} renderContent={this.renderGalleryCarousel}>
      <Image
        source={{ uri: media[0] }}
        style={servicesStyles.image}
      />
    </Lightbox>
  );

  renderServicio = () => {
    const { media, userId, name, service, serviceId, rating, description } = this.state.service;
    return (
      <View style={{ ...styles.slideInnerContainer, ...servicesStyles.slideInnerContainer }}>
        {this.renderImage(media)}
        <FloatIcon
          onPress={() => this.renderGalleryCarousel()}
          icon="image"
          color={appColors.white}
          style={{ right: 20, top: -265 }}
        />
        <View style={servicesStyles.titleContainer}>
          <View style={servicesStyles.serviceNamePanel}>
            <Text style={{
              ...servicesStyles.serviceText,
              ...{ fontSize: service.length > 16 ? 25 : 30 } }}
            >
              { service }
            </Text>
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
          onPress={() => this.props.navigation.navigate('Quote', { userId, serviceId })}
        />
      </View>
      // </View>
    );
  }

  render = () => (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <BackButton
        onPress={() => this.props.navigation.goBack()}
        icon="arrow-left"
        color={appColors.white}
        style={{ top: 5 }}
        type="material-community"
      />
      {this.renderServicio()}
    </ScrollView>
  );
}

ServiceDetails.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(ServiceDetails);
