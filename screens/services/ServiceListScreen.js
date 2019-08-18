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

const noRecordImage = require('../../assets/images/no-records.png');

class ServiceList extends Component {
  state = {
    showLoader: false,
    toAnswer: [],
    sent: [],
    scheduled: [],
    finished: [],
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
          const { loginInfo } = this.props;
          this.setList(resp.output, loginInfo._id);
        }
      })
      .catch((err) => {
        this.showLoader(false);
        console.log(err);
      });
  }

  setList = (quotes, id) => {
    const toAnswer = quotes.filter(q => (
      (q.status === quoteStatus.QUOTE_STATUS_SENT && q.receivedById === id)
      || (q.status === quoteStatus.QUOTE_STATUS_ANSWERED && q.sentById === id)));

    const sent = quotes.filter(q => (
      q.status === quoteStatus.QUOTE_STATUS_SENT && q.sentById === id));

    const finished = quotes.filter(q => (
      ([quoteStatus.QUOTE_STATUS_FINISHED, quoteStatus.QUOTE_STATUS_REJECTED].indexOf(q.status) !== -1)
      && (q.sentById === id))
      || (q.status === quoteStatus.QUOTE_STATUS_NO_ACCEPTED && q.receivedById === id));

    const scheduled = quotes.filter(q => (
      q.status === quoteStatus.QUOTE_STATUS_ACCEPTED));

    this.setState(prevState => ({
      ...prevState, toAnswer, sent, scheduled, finished,
    }));
  }

  onPressItem = (quote, type, action) => {
    this.props.navigation.navigate('QuoteDetails', { quote, type, action });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  renderList = (list, title, action) => (
    <View style={serviceListStyles.serviceSection}>
      <Text style={serviceListStyles.listTitle} h1>
        {title}
      </Text>
      <FlatList
        data={list}
        renderItem={data => <ListItem data={data.item} onPressItem={this.onPressItem} type="quote" action={action} />}
      />
    </View>
  )

  render() {
    const { toAnswer, sent, scheduled, finished } = this.state;
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
          {scheduled.length ? this.renderList(scheduled, this.props.language.scheduled, 'Mine') : null}
          {toAnswer.length ? this.renderList(toAnswer, this.props.language.answer_pending, 'Sent') : null}
          {sent.length ? this.renderList(sent, this.props.language.my_quotes, 'Mine') : null}
          {finished.length ? this.renderList(finished, this.props.language.finished, 'Mine') : null}
          {!toAnswer.length && !sent.length ? (
            <View style={commonStyles.alertFullImageContainer}>
              <Image
                source={noRecordImage}
                style={commonStyles.alertFullImage}
              />
              <Text h1 style={commonStyles.alertFullImageText}>
                No hay actividad a mostrar
              </Text>
            </View>
          ) : null}
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
