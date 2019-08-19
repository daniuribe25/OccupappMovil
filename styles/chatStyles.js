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
    width: 80,
  },
  avatarContainer: {
    borderRadius: 100,
    height: 74,
    width: 74,
    borderWidth: 2,
    borderColor: appColors.secondary,
  },
  avatarImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 70,
    width: 70,
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
    flex: 1,
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    color: appColors.primary,
  },
});
