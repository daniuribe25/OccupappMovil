import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const servicesStyles = StyleSheet.create({
  slide: {
    paddingHorizontal: -25,
    borderRadius: 3,
    marginBottom: 20,
    height: 270,
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  slideInnerContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 270,
  },
  titleContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  serviceNamePanel: {
    flex: 3.5,
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  serviceText: {
    fontSize: 28,
    fontWeight: '500',
    fontStyle: 'italic',
    color: appColors.grey,
  },
  userNameText: {
    fontSize: 18,
    color: appColors.secondary,
    fontWeight: '500',
    marginLeft: 5,
    marginVertical: 3,
  },
  ratingPanel: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    paddingRight: 10,
  },
  ratingText: {
    fontSize: 19,
    fontWeight: '500',
    color: appColors.primary,
    fontStyle: 'italic',
    flex: 1,
    textAlignVertical: 'top',
    paddingBottom: 17,
    left: 10,
  },
  ratingIcon: {
    flex: 1,
    textAlignVertical: 'top',
    paddingBottom: 20,
    marginLeft: 2,
    left: 10,
  },
  descriptionContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  descriptionText: {
    fontSize: 15,
  },
});
