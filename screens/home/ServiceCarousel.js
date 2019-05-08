import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { carouselStyles } from '../../styles/carouselStyles';

// const sliderWidth = Dimensions.get('screen').width;
const horizontalMargin = 0;
const slideWidth = 300;

const sliderWidth = Dimensions.get('window').width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 230;

const styles = StyleSheet.create({
  slide: { width: itemWidth, height: itemHeight },
  slideInnerContainer: { width: slideWidth },
});

class ServiceCarousel extends Component {
  renderItem = ({ item }) => {
    const { media, name, service } = item;
    // const mediaUri = require(`${media}`);
    return (
      <View style={{ ...styles.slide, ...carouselStyles.slide }}>
        <View style={{ ...styles.slideInnerContainer, ...carouselStyles.slideInnerContainer }}>
          <Image source={{ uri: media }} style={carouselStyles.image} />
          <View style={carouselStyles.descriptionContainer}>
            <View style={carouselStyles.serviceNamePanel}>
              <Text style={carouselStyles.serviceText}>{ service }</Text>
              <Text style={carouselStyles.userNameText}>{ name }</Text>
            </View>
            <View style={carouselStyles.ratingPanel}>
              <Text style={carouselStyles.ratingText}>4.3**</Text>
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
      autoplayInterval={3000}
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
