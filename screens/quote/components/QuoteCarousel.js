import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Image, TouchableHighlight, Text } from 'react-native';
import PropTypes from 'prop-types';
import { carouselStyles } from '../../../styles/carouselStyles';
import { appColors } from '../../../styles/colors';

const horizontalMargin = 0;

const sliderWidth = Dimensions.get('window').width;
const slideWidth = sliderWidth - (sliderWidth * 0.15);
const itemWidth = slideWidth + horizontalMargin * 2;

const styles = StyleSheet.create({
  slide: { width: itemWidth, height: 170, marginBottom: 0 },
  slideInnerContainer: { width: slideWidth },
  removeBtn: { paddingBottom: 12, opacity: 0.7, borderWidth: 3, borderColor: appColors.white, backgroundColor: appColors.grey, zIndex: 10, position: 'absolute', top: 45, right: (itemWidth / 2) - 45, width: 90, height: 90, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  removeText: { color: appColors.white, fontWeight: '400', fontSize: 60 },
});

class QuoteCarousel extends Component {
  renderItem = ({ item }) => {
    const { uri, type } = item;
    return (
      <View style={{ ...styles.slide, ...carouselStyles.slide }}>
        <View style={{ ...styles.slideInnerContainer, ...carouselStyles.slideInnerContainer }}>
          <TouchableHighlight
            onPress={() => this.props.onPressImage ? this.props.onPressImage(uri) : {}}
          >
            <Image
              source={{ uri }}
              style={carouselStyles.image}
            />
          </TouchableHighlight>
          {this.props.onRemove && (
            <TouchableHighlight
              underlayColor={appColors.mediumGrey}
              onPress={() => this.props.onRemove ? this.props.onRemove(uri) : {}}
              style={styles.removeBtn}
            >
              <Text style={styles.removeText}>x</Text>
            </TouchableHighlight>
          )}
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
