import React, { Component } from 'react';
import { Container } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ServiceCarousel from './components/ServiceCarousel';
import { commonStyles } from '../../styles/commonStyles';
import { carouselStyles } from '../../styles/carouselStyles';
import { searchBarStyles } from '../../styles/searchInputStyles';

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
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555879036/ProfileImages/2019-04-21T20-37-14.694Z_FB_IMG_1553616485773_vkpms5.jpg'],
      category: 'Hogar',
      rating: 0.3,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Laura Bedoya Peña',
      service: 'Manicure y pedicure',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1554026081/ProfileImages/2019-03-31T09-54-38.611Z_db303647-05dc-49ee-9354-8db6ebabf02a_mh5t5y.jpg'],
      category: 'Hogar',
      rating: 4.9,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Juan Pablo Sierra Grisales',
      service: 'Lavado de automovil',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1554026786/ProfileImages/2019-03-31T10-06-25.360Z_b46d909d-7677-475a-bd4c-87452f55d2b1_alkwux.jpg'],
      category: 'Hogar',
      rating: 4.5,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Santiago Lince',
      service: 'Reparación de ventanas',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555879036/ProfileImages/2019-04-21T20-37-14.694Z_FB_IMG_1553616485773_vkpms5.jpg'],
      category: 'Hogar',
      rating: '5.0',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Laura Bedoya Peña',
      service: 'Manicure y pedicure',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555988180/ProfileImages/2019-04-23T02-54-46.850Z_IMG_20190420_090415_memazn.jpg'],
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
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1553855417/sample.jpg'],
      category: 'Estetica',
      rating: 3.7,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Santiago Lince',
      service: 'Monitoria matemática',
      media: ['https://res.cloudinary.com/occupapp/image/upload/a_auto_left.hflip.vflip/a_90/v1555895369/ProfileImages/2019-04-22T01-09-26.707Z_StorySaver_laura99ramos_46590616_177076769920234_5819403503522219401_n_tcl9z4.jpg'],
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
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1555879036/ProfileImages/2019-04-21T20-37-14.694Z_FB_IMG_1553616485773_vkpms5.jpg'],
      category: 'Educación',
      rating: 4.2,
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    },
    {
      name: 'Juan Carlos Cardona',
      service: 'Clases de inglés',
      media: ['https://res.cloudinary.com/occupapp/image/upload/v1554026373/ProfileImages/2019-03-31T09-59-30.943Z_WhatsApp_Image_2019-02-23_at_9.57.19_AM_pnnkup.jpg'],
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
    return Object.keys(servicesCategories).map((x, i) => (
      <React.Fragment key={i}>
        <View style={carouselStyles.header}>
          <Text style={carouselStyles.category}>{x}</Text>
          <Text
            style={carouselStyles.seeAllLink}
            onPress={() => this.goToServices(x, false)}
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
          onFocus={() => this.goToServices('', true)}
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
