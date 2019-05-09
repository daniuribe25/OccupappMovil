import React, { Component } from 'react';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ServiceCarousel from './components/ServiceCarousel';
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
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Estetica',
      rating: 4.1,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      service: 'Plomería',
      name: 'Daniel Uribe Londono',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Hogar',
      rating: 0.3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Laura Bedoya Peña',
      service: 'Manicure y pedicure',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Hogar',
      rating: 4.9,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Juan Pablo Sierra Grisales',
      service: 'Lavado de automovil',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Hogar',
      rating: 4.5,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Santiago Lince',
      service: 'Reparación de ventanas',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Hogar',
      rating: '5.0',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Laura Bedoya Peña',
      service: 'Manicure y pedicure',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Estetica',
      rating: 2.1,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Maria Alejandra Ramirez',
      service: 'Manicure y pedicure',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Estetica',
      rating: 4.2,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Juan Carlos Cardona',
      service: 'Manicure y pedicure',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Estetica',
      rating: 3.7,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Santiago Lince',
      service: 'Monitoria matemática',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Educación',
      rating: '5.0',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Laura Bedoya Peña',
      service: 'Clases de canto',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Educación',
      rating: 2.1,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Maria Alejandra Ramirez',
      service: 'Clases de guitarra',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Educación',
      rating: 4.2,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Juan Carlos Cardona',
      service: 'Clases de inglés',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988013/ProfileImages/2019-04-23T02-53-09.218Z_IMG_20190418_185108_630_nhq3hm.jpg'],
      category: 'Educación',
      rating: 3.7,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
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
          <Text
            style={carouselStyles.seeAllLink}
            onPress={() => this.seeAllServices(x)}
          >
            Ver todas
          </Text>
        </View>
        <ServiceCarousel
          services={servicesCategories[x]}
          navigation={this.props.navigation}
        />
      </React.Fragment>
    ));
  }

  seeAllServices = (cat) => {
    const { servicesCategories } = this.state;
    let services = [];
    Object.keys(servicesCategories).forEach((x) => { if (x === cat) { services = servicesCategories[x]; } });
    this.props.navigation.navigate('AllServices', { services });
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
