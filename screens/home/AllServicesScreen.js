/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, FlatList, Dimensions, TouchableHighlight, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { carouselStyles } from '../../styles/carouselStyles';
import { appColors } from '../../styles/colors';
import { commonStyles } from '../../styles/commonStyles';
import { searchHeaderBarStyles } from '../../styles/searchInputStyles';
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
    servicesToShow: this.props.navigation.getParam('services'),
    type: this.props.navigation.getParam('type'),
    search: '',
  }

  updateSearch = (value) => {
    const services = this.filterServices(value);
    this.setState(prevState => ({
      ...prevState,
      search: value,
      servicesToShow: services,
    }));
  };

  filterServices = (filter) => {
    return this.state.services.filter(x => (x.name.toLowerCase()).indexOf(filter.toLowerCase()) !== -1
      || (x.service.toLowerCase()).indexOf(filter.toLowerCase()) !== -1
      || (x.category.toLowerCase()).indexOf(filter.toLowerCase()) !== -1
    );
  }

  searchBar = () => (
    <View style={searchHeaderBarStyles.container}>
      <Icon
        style={searchHeaderBarStyles.icon}
        name={this.state.search ? 'times' : 'search'}
        size={22}
        onPress={() => { if (this.state.search) { this.updateSearch(''); } }}
      />
      <TextInput
        style={searchHeaderBarStyles.input}
        placeholder={this.props.language['search']}
        onChangeText={text => this.updateSearch(text)}
        value={this.state.search}
        maxLength={30}
      />
    </View>
  );

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
    const style = {
      container: +this.state.type ? {} : { paddingTop: 0, marginBottom: 20 },
      backButton: +this.state.type ? {} : { top: 8, left: 20 },
    };
    return (
      <View style={{ ...style.container, ...commonStyles.container }}>
        <BackButton
          style={style.backButton}
          onPress={() => this.props.navigation.goBack()}
          icon="arrow-left"
          color={appColors.primary}
          type="material-community"
        />
        {+this.state.type ? (
          <View style={commonStyles.titleContainer}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>{title}</Text>
          </View>
        ) : (
          this.searchBar()
        )}
        <FlatList
          data={this.state.servicesToShow}
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
