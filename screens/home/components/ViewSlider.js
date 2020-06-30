/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';
import SliderPage from './SliderPage';

class ViewSlider extends PureComponent {
  state = { currentPage: 0, goLeft: true }

  changePage = (direction) => {
    const { currentPage } = this.state;
    const { pages, submitForm, validateForm } = this.props;
    const isLastPage = currentPage + direction >= pages.length;
    if (validateForm(currentPage) || isLastPage || direction < 0) {
      const next = currentPage + direction;
      if (isLastPage) submitForm();
      else { this.setState({ currentPage: next, goLeft: direction > 0 }); }
    } else {
      Alert.alert('Alerta', 'Debes seleccionar una opción');
    }
  }

  render = () => {
    const { goLeft, currentPage } = this.state;
    return (
      <View>
        {this.props.pages.map((x, i) => (
          <SliderPage
            key={i}
            display={currentPage === i}
            changePage={this.changePage}
            index={i}
            goLeft={goLeft}
          >
            {x.content}
          </SliderPage>
        ))}
      </View>
    );
  }
}

ViewSlider.propTypes = {
  pages: PropTypes.array.isRequired,
  validateForm: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
};

export default ViewSlider;
