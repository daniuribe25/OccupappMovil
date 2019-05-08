import React, { Component } from 'react';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ServiceCarousel from './ServiceCarousel';
import { commonStyles } from '../../styles/commonStyles';
import { searchBarStyles, carouselStyles } from '../../styles/carouselStyles';

class HomeScreen extends Component {
  state = {
    servicesCategories: [],
  }

  componentDidMount = () => {
    const services = [{
      service: 'Manicure y pedicure',
      name: 'Daniel Uribe Londono',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Estetica',
    },
    {
      service: 'Plomería',
      name: 'Daniel Uribe Londono',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Hogar',
    },
    {
      name: 'Laura Bedoya Peña',
      service: 'Manicure y pedicure',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Hogar',
    },
    {
      name: 'Juan Pablo Sierra Grisales',
      service: 'Lavado de automovil',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Hogar',
    },
    {
      name: 'Santiago Lince',
      service: 'Reparación de ventanas',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Hogar',
    },
    {
      name: 'Laura Bedoya Peña',
      service: 'Manicure y pedicure',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Estetica',
    },
    {
      name: 'Maria Alejandra Ramirez',
      service: 'Manicure y pedicure',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Estetica',
    },
    {
      name: 'Juan Carlos Cardona',
      service: 'Manicure y pedicure',
      media: 'https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg',
      category: 'Estetica',
    },
    ];
    const servicesCategories = services.reduce((r, a) => {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));
    this.setState(prevState => ({
      ...prevState,
      servicesCategories,
    }));
  }

  inputChangeHandler = (value) => {
    this.setState(prevState => ({
      ...prevState,
      search: value,
    }));
  };

  createCarousels = () => {
    const { servicesCategories } = this.state;
    return Object.keys(servicesCategories).map(x => (
      <React.Fragment>
        <View style={carouselStyles.header}>
          <Text style={carouselStyles.category}>{x}</Text>
          <Text style={carouselStyles.seeAllLink}>Ver todas</Text>
        </View>
        <ServiceCarousel
          services={servicesCategories[x]}
        />
      </React.Fragment>
    ));
  }

  searchInput = () => {
    return (
      <View style={searchBarStyles.container}>
        <Icon
          style={searchBarStyles.icon}
          name="search"
          size={15}
          color="red"
        />
        <TextInput
          style={searchBarStyles.input}
          placeholder="Buscar"
          onChangeText={text => this.inputChangeHandler(text)}
          value={this.state.search}
          maxLength={30}
        />
      </View>
    );
  }

  render() {
    return (
      <Container style={commonStyles.container}>
        <ScrollView>
          <View style={commonStyles.titleContainer}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
            {this.searchInput()}
            {this.createCarousels()}
          </View>
        </ScrollView>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
});

export default connect(mapStateToProps)(HomeScreen);
