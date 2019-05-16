import React, { Component } from 'react';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, TextInput, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ServiceCarousel from './components/ServiceCarousel';
import Loader from '../../components/custom/Loader';
import { commonStyles } from '../../styles/commonStyles';
import { carouselStyles } from '../../styles/carouselStyles';
import { searchBarStyles } from '../../styles/searchInputStyles';
import { getUserServicesWithCategories } from '../../services/userServicesServices';

class HomeScreen extends Component {
  state = {
    servicesCategories: [],
    noFound: false,
    showLoader: false,
  }

  componentDidMount = () => {
    this.getUserServices();
  }

  getUserServices = () => {
    this.showLoader(true);
    getUserServicesWithCategories(0)
      .then(req => req.json())
      .then((resp) => {
        this.showLoader(false);
        if (!resp.success) {
          this.setState(prevState => ({ ...prevState, noFound: true }));
        } else {
          const servicesCategories = resp.output.reduce((r, a) => {
            r[a.category] = r[a.category] || [];
            r[a.category].push(a);
            return r;
          }, Object.create(null));
          this.setState(prevState => ({
            ...prevState,
            servicesCategories,
          }));
        }
      })
      .catch(() => {
        this.showLoader(false);
        ToastAndroid.show('Error 009', ToastAndroid.LONG);
      });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  inputChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      search: value,
    }));
  };

  createCarousels = () => {
    const { servicesCategories } = this.state;
    return Object.keys(servicesCategories).map((x, i) => (
      <React.Fragment key={i}>
        <View style={carouselStyles.header}>
          <Text style={carouselStyles.category}>{x}</Text>
          <Text
            style={carouselStyles.seeAllLink}
            onPress={() => this.goToServices(x, false)}
          >
            {this.props.language['seeAll']}
          </Text>
        </View>
        <ServiceCarousel
          services={servicesCategories[x]}
          navigation={this.props.navigation}
        />
      </React.Fragment>
    ));
  }

  goToServices = (cat, isSearch) => {
    const { servicesCategories } = this.state;
    let services = [];
    Object.keys(servicesCategories).forEach((x) => {
      if (isSearch || x === cat) {
        services = [...services, ...servicesCategories[x]];
      }
    });
    this.props.navigation.navigate('AllServices', { services, type: isSearch ? 0 : 1 });
  }

  openFilter = () => {
    
  }

  searchInput = () => (
    <View style={searchBarStyles.container}>
      <Icon style={searchBarStyles.icon} name="search" size={15} />
      <TextInput
        style={searchBarStyles.input}
        placeholder={this.props.language['search']}
        onChangeText={text => this.inputChangeHandler(text)}
        value={this.state.search}
        maxLength={30}
        onFocus={() => this.goToServices('', true)}
      />
      <Icon style={searchBarStyles.filterIcon} name="filter" size={20} onPress={this.openFilter}/>
    </View>
  );

  render = () => (
    <Container style={commonStyles.container}>
      <Loader show={this.state.showLoader} />
      <ScrollView>
        <View style={commonStyles.titleContainer}>
          <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
          {this.searchInput()}
          {this.state.noFound ? (
            <Text style={commonStyles.noRecordsFound}>
              No se encontraron servicios
            </Text>
          ) : null}
          {this.createCarousels()}
        </View>
      </ScrollView>
    </Container>
  );
}

HomeScreen.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(HomeScreen);
