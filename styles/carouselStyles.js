import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const carouselStyles = StyleSheet.create({
  slide: {
    paddingHorizontal: -25,
    borderRadius: 3,
    marginTop: 2,
    marginBottom: 20,
  },
  seeAllSlide: {
    marginTop: 2,
    marginBottom: 20,
  },
  slideInnerContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 3,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 5,
  },
  serviceNamePanel: {
    flex: 4,
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
    paddingTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  ratingText: {
    fontSize: 22,
    fontWeight: '500',
    color: appColors.primary,
    fontStyle: 'italic',
    flex: 1,
    textAlignVertical: 'top',
  },
  ratingIcon: {
    flex: 1,
    textAlignVertical: 'top',
    paddingBottom: 4,
    marginLeft: 2,
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
    marginTop: -14,
  },
  seeAllLink: {
    fontSize: 16,
    fontWeight: '500',
    color: appColors.primary,
    alignItems: 'flex-end',
    flexBasis: '30%',
  },
});
