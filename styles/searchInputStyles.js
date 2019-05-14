import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const searchBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '85%',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 25,
  },
  icon: {
    position: 'absolute',
    left: '5%',
    zIndex: 2,
    color: appColors.mediumGrey,
  },
  input: {
    backgroundColor: appColors.lightGrey,
    borderRadius: 30,
    width: '100%',
    height: 40,
    paddingLeft: 45,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: appColors.grey,
  },
});

export const searchHeaderBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    position: 'absolute',
    right: 50,
    zIndex: 100,
    color: appColors.mediumGrey,
  },
  input: {
    width: '100%',
    height: 60,
    paddingLeft: 80,
    flex: 1,
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: appColors.grey,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
  },
});
