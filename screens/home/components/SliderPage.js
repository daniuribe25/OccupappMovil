/* eslint-disable react/no-multi-comp */
import React, { PureComponent } from 'react';
import { View, Dimensions, Animated, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import viewSliderStyles from '../../../styles/viewSliderStyles';
import { appColors } from '../../../styles/colors';

const sliderWidth = Dimensions.get('window').width;

class SliderPage extends PureComponent {
  state = { left: new Animated.Value(sliderWidth) }

  componentDidMount() {
    if (this.props.index === 0) this.goIn();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.display !== newProps.display) {
      if (newProps.display) this.goIn();
      else this.goOut(newProps.goLeft);
    }
  }

  goIn = () => {
    Animated.timing(this.state.left, {
      toValue: 0,
      duration: 300,
    }).start();
  }

  goOut = (left) => {
    Animated.timing(this.state.left, {
      toValue: left ? 0 - (sliderWidth) : sliderWidth,
      duration: 300,
    }).start();
  }

  render() {
    const { index, changePage } = this.props;
    return (
      <Animated.View style={{
        ...viewSliderStyles.animatedPage,
        left: this.state.left,
        paddingTop: [5, 6].includes(index) ? 0 : 30,
      }}
      >
        {this.props.children}
        <View style={viewSliderStyles.previousNextButtons}>
          {index !== 0 && (
            <Button
              buttonStyle={viewSliderStyles.button}
              containerStyle={viewSliderStyles.containerButton}
              btnContainerStyle={viewSliderStyles.btnContainerButton}
              title="Anterior"
              onPress={() => changePage(-1)}
              type="outline"
            />
          )}
          <Button
            buttonStyle={{ ...viewSliderStyles.button, backgroundColor: appColors.primary }}
            containerStyle={viewSliderStyles.containerButton}
            btnContainerStyle={viewSliderStyles.btnContainerButton}
            title="Siguiente"
            onPress={() => changePage(1)}
          />
        </View>
      </Animated.View>
    );
  }
}

SliderPage.propTypes = {
  changePage: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  display: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};


export default SliderPage;
