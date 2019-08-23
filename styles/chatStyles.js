import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const chatStyles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 0,
    backgroundColor: appColors.lightGrey,
    borderBottomWidth: 0.3,
    borderBottomColor: appColors.grey,
    paddingHorizontal: 20,
    paddingVertical: 3,
    display: 'flex',
    flexDirection: 'row',
  },
  avatarSection: {
    width: 60,
  },
  avatarContainer: {
    borderRadius: 100,
    height: 59,
    width: 59,
    borderWidth: 2,
    borderColor: appColors.secondary,
  },
  avatarImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 55,
    width: 55,
    borderWidth: 1,
    borderColor: appColors.white,
  },
  nameSection: {
    flex: 4,
    flexDirection: 'column',
    paddingBottom: 3,
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  nameText: {
    flex: 1,
    fontSize: 19,
    color: appColors.grey,
    fontWeight: '500',
    paddingTop: 5,
  },
  messageText: {
    flex: 2.5,
    fontSize: 14,
    color: appColors.grey,
  },
  dateSection: {
    flex: 1.5,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  dateText: {
    flex: 1,
    fontSize: 14,
    color: appColors.primary,
  },
  numberSection: {
    flex: 1,
    height: 11.5,
    bottom: 7,
    paddingHorizontal: 6.5,
    color: appColors.white,
    fontWeight: '500',
    backgroundColor: appColors.secondary,
    borderRadius: 100,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    textAlign: 'center',
  },
  number: {
    color: appColors.white,
    fontWeight: '600',
    fontSize: 12,
  },
});