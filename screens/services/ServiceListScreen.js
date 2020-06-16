/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, FlatList, Image, ScrollView, RefreshControl } from 'react-native';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from './components/ListItem';
import { getUserQuotes } from '../../services/quoteServices';
import { commonStyles } from '../../styles/commonStyles';
import { quoteStatus } from '../../constants/appConstants';
import { serviceListStyles } from '../../styles/serviceListStyles';
import Loader from '../../components/custom/Loader';
import { appColors } from '../../styles/colors';
import TextF from '../../components/custom/TextF';

const noRecordImage = require('../../assets/images/no-records.png');

class ServiceList extends Component {
  state = {
    showLoader: false,
    toAnswer: [],
    sent: [],
    scheduled: [],
    finished: [],
    firstTime: true,
  };

  componentDidMount() {
    this.props.navigation.addListener(
      'didFocus',
      () => this.fetchUserServices(),
    );
  }

  fetchUserServices = async () => {
    this.showLoader(true);
    try {
      const req = await getUserQuotes(this.props.loginInfo._id);
      const resp = await req.json();
      this.showLoader(false);
      if (resp.success) {
        const { loginInfo } = this.props;
        this.setList(resp.output, loginInfo._id);
      }
    } catch (err) {
      this.showLoader(false);
      console.log(err);
    }
  }

  setList = (quotes, id) => {
    quotes = quotes.map((x) => {
      x.statusToShow = x.status;
      return x;
    });

    let toAnswer = quotes.filter(q => (
      (q.status === quoteStatus.QUOTE_STATUS_SENT && q.receivedById === id)
      || (q.status === quoteStatus.QUOTE_STATUS_ANSWERED && q.sentById === id)));

    toAnswer = toAnswer.map((x) => {
      if (x.status === quoteStatus.QUOTE_STATUS_ANSWERED && x.sentById === id) {
        x.statusToShow = 'Quoted';
      }
      return x;
    });

    let sent = quotes.filter(q => (
      q.status === quoteStatus.QUOTE_STATUS_SENT && q.sentById === id));

    sent = sent.map((x) => {
      x.statusToShow = 'Waiting';
      return x;
    });

    const finished = quotes.filter(q => (
      ([quoteStatus.QUOTE_STATUS_FINISHED, quoteStatus.QUOTE_STATUS_REJECTED].indexOf(q.status) !== -1)
      && (q.sentById === id))
      || (q.status === quoteStatus.QUOTE_STATUS_NO_ACCEPTED && q.receivedById === id));

    const scheduled = quotes.filter(q => (
      q.status === quoteStatus.QUOTE_STATUS_ACCEPTED));

    this.setState(prevState => ({
      ...prevState, toAnswer, sent, scheduled, finished, firstTime: false,
    }));
  }

  onPressItem = (quote, type) => {
    this.props.navigation.navigate('QuoteDetails',
      { quote, type, fromPayment: null });
  }

  showLoader = (show) => {
    this.setState(prevState => ({ ...prevState, showLoader: show }));
  }

  renderList = (list, title) => (
    <View style={serviceListStyles.serviceSection}>
      <TextF style={serviceListStyles.listTitle} h1>
        {title}
      </TextF>
      <FlatList
        data={list}
        renderItem={data => <ListItem data={data.item} onPressItem={this.onPressItem} type="quote" />}
      />
    </View>
  )

  render() {
    const { toAnswer, sent, scheduled, finished, firstTime } = this.state;
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
            <TextF style={{ ...commonStyles.title, fontWeight: 'bold' }} h1>OCCUPAPP</TextF>
          </View>
            {toAnswer.length ? this.renderList(toAnswer, this.props.language.answer_pending) : null}
            {scheduled.length ? this.renderList(scheduled, this.props.language.scheduled) : null}
            {sent.length ? this.renderList(sent, this.props.language.my_quotes) : null}
            {finished.length ? this.renderList(finished, this.props.language.finished) : null}
            {!firstTime && !toAnswer.length && !sent.length && !scheduled.length && !finished.length ? (
              <View style={commonStyles.alertFullImageContainer}>
                <Image
                  source={noRecordImage}
                  style={commonStyles.alertFullImage}
                />
                <TextF h1 style={commonStyles.alertFullImageText}>
                  No hay actividad a mostrar
                </TextF>
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
