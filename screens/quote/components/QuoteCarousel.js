import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import { carouselStyles } from '../../../styles/carouselStyles';

const horizontalMargin = 0;

const sliderWidth = Dimensions.get('window').width;
const slideWidth = sliderWidth - (sliderWidth * 0.15);
const itemWidth = slideWidth + horizontalMargin * 2;

const styles = StyleSheet.create({
  slide: { width: itemWidth, height: 170, marginBottom: 0 },
  slideInnerContainer: { width: slideWidth },
});

class QuoteCarousel extends Component {
  renderItem = ({ item }) => {
    const { uri, type } = item;
    return (
      <View style={{ ...styles.slide, ...carouselStyles.slide }}>
        <View style={{ ...styles.slideInnerContainer, ...carouselStyles.slideInnerContainer }}>
          <TouchableHighlight
            onPress={() => {}}
          >
            <Image
              source={{ uri }}
              style={carouselStyles.image}
            />
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render = () => (
    <Carousel
      data={this.props.media}
      renderItem={this.renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      itemHeight={170}
      layout="default"
      autoplay
      autoplayInterval={5000}
      slideStyle="Animated"
    />
  );
}

QuoteCarousel.propTypes = {
  media: PropTypes.arrayOf(PropTypes.instanceOf({})).isRequired,
};

export default QuoteCarousel;
