import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { carouselStyles } from '../../../styles/carouselStyles';
import { appColors } from '../../../styles/colors';

const horizontalMargin = 0;

const sliderWidth = Dimensions.get('window').width;
const slideWidth = sliderWidth - (sliderWidth * 0.15);
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 230;

const styles = StyleSheet.create({
  slide: { width: itemWidth, height: itemHeight },
  slideInnerContainer: { width: slideWidth },
});

class ServiceCarousel extends Component {
  renderItem = ({ item }) => {
    const { media, name, service, rating } = item;
    return (
      <View style={{ ...styles.slide, ...carouselStyles.slide }}>
        <View style={{ ...styles.slideInnerContainer, ...carouselStyles.slideInnerContainer }}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('ServiceDetails', { service: item })}
          >
            <Image
              source={{ uri: media[0].url }}
              style={carouselStyles.image}
            />
          </TouchableHighlight>
          <View style={carouselStyles.descriptionContainer}>
            <View style={carouselStyles.serviceNamePanel}>
              <Text style={carouselStyles.serviceText}>{ service }</Text>
              <Text style={carouselStyles.userNameText}>{ name }</Text>
            </View>
            <View style={carouselStyles.ratingPanel}>
              <Text style={carouselStyles.ratingText}>{rating}</Text>
              <Icon
                style={carouselStyles.ratingIcon}
                name="star"
                size={18}
                color={appColors.primary}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  render = () => (
    <Carousel
      // ref={(c) => { this.carousel = c; }}
      data={this.props.services}
      renderItem={this.renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      itemHeight={340}
      layout="default"
      autoplay
      loop
      autoplayInterval={Math.random() * (6000 - 3000) + 3000}
      slideStyle="Animated"
    />
  );
}

ServiceCarousel.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
  services: PropTypes.arrayOf(PropTypes.instanceOf({})).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(ServiceCarousel);