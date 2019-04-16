import { StyleSheet } from 'react-native';
import { appColors } from './colors';

export const commonStyles = StyleSheet.create({
  container: {
    fontFamily: 'Georgia, Times New Roman, Times, serif',
    paddingVertical: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  welcomeTitleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: '20%',
  },
  welcomeTitle: {
    letterSpacing: 8,
    fontSize: 42,
    color: appColors.white,
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: 20,
  },
  title: {
    letterSpacing: 5,
    fontSize: 20,
    height: 25,
  },
  backBtnIconContainer: {
    position: 'absolute',
    top: -5,
    left: 15,
  },
  backBtnIcon: {
    zIndex: 10,
    elevation: 10,
    color: appColors.primary,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  textInputIcon: {
    padding: 10,
  },
  textInput: {
    flexDirection: 'column',
    height: 80,
    width: '90%',
    fontSize: 20,
    color: appColors.third,
    borderBottomWidth: 2,
    borderBottomColor: appColors.borderBottom,
    borderRadius: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: appColors.borderBottom,
    width: '90%',
    borderRadius: 10,
  },
  picker: {
    flex: 1,
    height: 70,
    width: '90%',
    fontSize: 70,
    borderBottomWidth: 2,
    borderBottomColor: appColors.borderBottom,
  },
  timePickerInput: {
    color: appColors.third,
    paddingHorizontal: 5,
    paddingVertical: 25,
    fontSize: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: appColors.primary,
    height: 60,
    flexBasis: '50%',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 18,
    textAlign: 'center',
  },
  imagePickerContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: 100,
  },
  imagePickerBtn: {
    marginTop: 25,
    borderColor: appColors.secondary,
    borderRadius: 30,
    fontSize: 20,
    width: '60%',
    textAlign: 'center',
    justifyContent: 'center',
    height: 50,
  },
  imagePickerBtnText: {
    color: appColors.secondary,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  imagePickerShowedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerShowed: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
});
