/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, FlatList, Image, ScrollView, RefreshControl } from 'react-native';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from './components/ListItem';
import { getUserQuotes } from '../../services/quoteServices';
import { commonStyles } from '../../styles/commonStyles';
import { quoteStatus } from '../../constants/appConstants';
import { serviceListStyles } from '../../styles/serviceListStyles';
import Loader from '../../components/custom/Loader';
import { appColors } from '../../styles/colors';

class ServiceList extends Component {
  state = {
    showLoader: false,
    quotes: [],
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => this.fetchUserServices(),
    );
  }

  fetchUserServices = () => {
    this.showLoader(true);
    getUserQuotes(this.props.loginInfo._id)
      .then(res => res.json())
      .then((resp) => {
        this.showLoader(false);
        if (resp.success) {
          this.setState(prevState => ({
            ...prevState,
            quotes: resp.output.filter(q => q.status === quoteStatus.QUOTE_STATE_SENT),
          }));
        }
      })
      .catch((err) => {
        this.showLoader(false);
        console.log(err);
      });
  }

  onPressItem = (quote, type) => {
    this.props.navigation.navigate('QuoteDetails', { quote, type, action: 'Sent' });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  render() {
    const { quotes } = this.state;
    return (
      <Container style={{ ...commonStyles.container, ...{ flex: 1, paddingBottom: 0 } }}>
        <Loader show={this.state.showLoader} />
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={this.state.showLoader}
              onRefresh={this.fetchUserServices}
              colors={[appColors.primary, appColors.secondary]}
            />
          )}
        >
          <View style={{ ...commonStyles.titleContainer, ...{ paddingBottom: 5 } }}>
            <Text style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</Text>
          </View>
          {quotes.length ? (
            <React.Fragment>
              <Text style={serviceListStyles.listTitle} h1>
                {this.props.language.answer_pending}
              </Text>
              <FlatList
                data={quotes}
                renderItem={data => <ListItem data={data.item} onPressItem={this.onPressItem} type="quote" />}
              />
            </React.Fragment>
          ) : (
            <View style={commonStyles.alertFullImageContainer}>
              <Image
                source={require('../../assets/images/no-records.png')}
                style={commonStyles.alertFullImage}
              />
              <Text h1 style={commonStyles.alertFullImageText}>
                No hay actividad a mostrar
              </Text>
            </View>
          )
          }
        </ScrollView>
      </Container>
    );
  }
}

ServiceList.propTypes = {
  language: PropTypes.objectOf({}).isRequired,
};

const mapStateToProps = state => ({
  language: state.login.language,
  loginInfo: state.login.loginInfo,
});

export default connect(mapStateToProps)(ServiceList);