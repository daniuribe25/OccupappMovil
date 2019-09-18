import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const carouselStyles = StyleSheet.create({
  slide: {
    paddingHorizontal: -25,
    borderRadius: 7,
    marginTop: 5,
    marginBottom: 20,
  },
  seeAllSlide: {
    marginTop: 2,
    marginBottom: 30,
  },
  slideInnerContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 7,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  serviceNamePanel: {
    flex: 3.5,
    paddingLeft: 5,
  },
  serviceText: {
    fontSize: 20,
    fontStyle: 'italic',
    color: appColors.black,
  },
  userNameText: {
    fontSize: 16,
    color: appColors.secondary,
  },
  ratingPanel: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 15,
  },
  ratingText: {
    fontSize: 19,
    fontWeight: '500',
    color: appColors.primary,
    fontStyle: 'italic',
    flex: 1,
    textAlignVertical: 'top',
    alignSelf: 'flex-end',
    left: 10,
  },
  ratingIcon: {
    flex: 1,
    textAlignVertical: 'top',
    paddingBottom: 4,
    left: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '8%',
  },
  category: {
    fontSize: 24,
    fontWeight: '500',
    color: appColors.black,
    alignItems: 'flex-start',
    flexBasis: '70%',
    marginTop: -20,
  },
  seeAllLink: {
    fontSize: 16,
    fontWeight: '500',
    color: appColors.primary,
    alignItems: 'flex-end',
    flexBasis: '30%',
    marginTop: -8,
  },
});
