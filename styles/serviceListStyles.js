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

export const paymentListStyles = StyleSheet.create({
  itemTitle: {
    fontSize: 18,
    paddingTop: 5,
    color: appColors.secondary,
  },
  itemDate: {
    fontSize: 16,
    paddingTop: 3,
  },
  statusText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 3,
    paddingBottom: 5,
    fontStyle: 'italic',
  },
  textSection: {
    flex: 5,
  },
  priceSection: {
    width: 100,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 20,
    fontWeight: '500',
    paddingTop: 5,
    paddingStart: 10,
    paddingBottom: 5,
    fontStyle: 'italic',
  },
  totalContainer: {
    height: 40,
    width: '100%',
    position: 'relative',
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  totalText: {
    fontSize: 26,
    fontWeight: '500',
    marginTop: 2,
    alignSelf: 'flex-start',
    color: appColors.grey,
    fontStyle: 'italic',
  },
  totalValue: {
    fontSize: 26,
    fontWeight: '500',
    marginBottom: 3,
    alignSelf: 'flex-end',
    color: appColors.primary,
    fontStyle: 'italic',
  },
  billBtnIconContainer: {
    position: 'absolute',
    top: -11,
    right: 23,
    zIndex: 1000,
  },
  daviBtnIconContainer: {
    position: 'absolute',
    top: 0,
    left: 23,
    zIndex: 1000,
  },
  daviBtnIcon: {
    height: 25,
    width: 25,
  },
});
