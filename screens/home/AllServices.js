/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { carouselStyles } from '../../styles/carouselStyles';
import { appColors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';
import BackButton from '../../components/custom/BackButton';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth - (sliderWidth * 0.12);

const styles = StyleSheet.create({
  slide: { width: sliderWidth, height: 240, justifyContent: 'center', alignItems: 'center', paddingBottom: 10 },
  slideInnerContainer: { width: itemWidth },
});

class AllServices extends Component {
  state = {
    services: this.props.navigation.getParam('services'),
  }

  renderItem = ({ item }) => {
    const { media, name, service, rating } = item;
    return (
      <View style={{ ...styles.slide, ...carouselStyles.seeAllSlide }}>
        <View style={{ ...styles.slideInnerContainer, ...carouselStyles.slideInnerContainer }}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('ServiceDetails', { service: item })}
          >
            <Image
              source={{ uri: media[0] }}
              style={carouselStyles.image}
              onPress={() => this.props.navigation.navigate('ServiceDetails', { service: item })}
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

  render = () => {
    const { services } = this.state;
    const title = services[0].category;
    return (
      <View style={commonStyles.container}>
        <BackButton onPress={() => this.props.navigation.goBack()} />
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>{title}</Text>
        </View>
        <FlatList
          data={this.state.services}
          renderItem={this.renderItem}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        />
      </View>
    );
  }
}

AllServices.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(AllServices);
