import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const sessionStyles = StyleSheet.create({
  welcomeBtnsContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  welcomeBtnsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinBtn: {
    borderRadius: 30,
    borderColor: 'transparent',
    fontSize: 20,
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    height: 50,
  },
  joinBtnText: {
    color: appColors.secondary,
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  btnBorder: {
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: appColors.fb,
  },
  fbBtnsContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbBtn: {
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 15,
    borderColor: 'transparent',
    fontSize: 20,
    width: 226,
    height: 50,
  },
  fbBtnText: {
    color: appColors.fb,
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  fbBtnBorder: {
    borderRadius: 15,
    borderWidth: 2.5,
    borderColor: appColors.fb,
  },
  continueWith: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  continueWithText: {
    color: appColors.grey,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  rememberPasswordLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rememberPasswordLinkText: {
    color: appColors.primary,
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: appColors.primary,
  },
});
