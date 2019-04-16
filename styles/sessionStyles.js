import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const sessionStyles = StyleSheet.create({
  welcomeBtnsContainer: {
    flexDirection: 'column',
    marginTop: '60%',
    flex: 1,
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
    borderRadius: 30,
    borderWidth: 2.5,
    borderColor: appColors.secondary,
  },
});
