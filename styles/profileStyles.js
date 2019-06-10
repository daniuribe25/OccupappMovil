import { StyleSheet, Dimensions } from 'react-native';
import { appColors } from './colors';

const sliderWidth = Dimensions.get('window').width;

export const profileStyles = StyleSheet.create({
  profileImageNameContainer: {
    width: sliderWidth,
    marginVertical: 15,
    height: 160,
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
});
