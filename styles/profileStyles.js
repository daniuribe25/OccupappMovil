import { StyleSheet, Dimensions } from 'react-native';
import { appColors } from './colors';

const sliderWidth = Dimensions.get('window').width;

export const profileStyles = StyleSheet.create({
  profileImageNameContainer: {
    width: sliderWidth,
    marginTop: 15,
    marginBottom: 25,
    height: 190,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageContainer: {
    borderRadius: 100,
    height: 126,
    width: 126,
    borderWidth: 3,
    borderColor: appColors.primary,
  },
  profileImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 120,
    width: 120,
    borderWidth: 3,
    borderColor: appColors.white,
  },
  profileImageName: {
    fontSize: 20,
    color: appColors.grey,
    padding: 10,
  },
  addServiceBtn: {
    position: 'absolute',
    bottom: 6,
    right: 12,
  },
  ratingStyles: {
    alignItems: 'flex-start',
    marginRight: 6,
    marginTop: 4,
  },
  ratingText: {
    color: '#f1c40f',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  optionsSection: {
    width: 70,
  },
});
