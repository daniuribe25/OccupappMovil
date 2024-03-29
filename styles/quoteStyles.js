import { StyleSheet, Dimensions } from 'react-native';
import { appColors } from './colors';

const sliderWidth = Dimensions.get('window').width;

export const quoteStyles = StyleSheet.create({
  descriptionText: {
    fontSize: 16,
    color: appColors.grey,
    textAlign: 'center',
    width: sliderWidth - 40,
    marginVertical: 10,
  },
  textCounter: {
    fontSize: 14,
    color: appColors.grey,
    textAlign: 'right',
    width: sliderWidth - 40,
    marginEnd: 20,
  },
  descriptionInput: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 150,
    paddingStart: 15,
    borderColor: appColors.lightGrey,
    borderWidth: 2,
    textAlignVertical: 'top',
  },
  mediaButtonsContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 20,
    marginRight: 'auto',
    marginHorizontal: 30,
  },
  imagePickerBtnStyles: {
    height: 70,
    width: 70,
    borderRadius: 10,
    elevation: 0.5,
    marginStart: 15,
  },
  titleText: {
    fontSize: 18,
    color: appColors.secondary,
    fontWeight: '500',
    textAlign: 'left',
    width: sliderWidth - 40,
    marginVertical: 10,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '500',
    color: appColors.primary,
    textAlign: 'center',
    marginVertical: 10,
  },
  statusBox: {
    marginTop: 10,
    paddingTop: 2,
  },
  ratingStyles: {
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
});
