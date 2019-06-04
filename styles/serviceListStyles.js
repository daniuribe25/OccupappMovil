import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const serviceListStyles = StyleSheet.create({
  listTitle: {
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 5,
    marginHorizontal: 20,
    color: appColors.primary,
  },
  itemContainer: {
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 5,
    elevation: 1,
    backgroundColor: appColors.lightGrey,
    paddingHorizontal: 20,
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  textSection: {
    flex: 10,
  },
  iconSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '500',
    paddingVertical: 5,
  },
  subTitleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  itemSubTitle: {
    fontSize: 13,
    paddingVertical: 5,
    paddingStart: 10,
    paddingBottom: 8,
    color: appColors.secondary,
  },
});
