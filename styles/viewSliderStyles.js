import { StyleSheet, Dimensions } from 'react-native';

const sliderWidth = Dimensions.get('window').width;
const sliderHeight = Dimensions.get('window').height;

const viewSliderStyles = {
  animatedPage: {
    width: sliderWidth,
    height: sliderHeight,
    borderLeft: '#e8e8e8 solid 10px',
    position: 'absolute',
    alignItems: 'center',
    textAlign: 'center',
  },
  previousNextButtons: {
    textAlign: 'center',
    height: 100,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'row',
    width: '100%',
    position: 'absolute',
    top: sliderHeight - 220,
  },
  btnContainerButton: { paddingTop: 20, paddingBottom: 0 },
  containerButton: { width: '45%', marginRight: 10 },
  button: { paddingVertical: 10 },
};

export default viewSliderStyles;
