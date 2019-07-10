import { StyleSheet, Dimensions } from 'react-native';
import { appColors } from './colors';

const sliderWidth = Dimensions.get('window').width;

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
    color: appColors.black,
  },
  backBtnIconContainer: {
    position: 'absolute',
    top: -10,
    left: 20,
    zIndex: 1000,
  },
  backBtnIcon: {
    zIndex: 10,
    elevation: 10,
    color: appColors.primary,
    opacity: 0.4,
  },
  floatIconContainer: {
    position: 'absolute',
    zIndex: 1000,
  },
  floatIcon: {
    zIndex: 10,
    elevation: 10,
    opacity: 0.4,
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
  centerElement: {
    flex: 1,
    justifyContent: 'center',
  },
  noRecordsFound: {
    marginTop: '30%',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: '500',
    color: appColors.mediumGrey,
    width: sliderWidth,
  },
  alertFullImageContainer: {
    width: sliderWidth,
    marginTop: '16%',
    padding: 30,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertFullImage: {
    width: sliderWidth - 130,
    justifyContent: 'center',
    alignItems: 'center',
    height: sliderWidth - 180,
  },
  alertFullImageText: {
    fontSize: 16,
    color: appColors.grey,
    padding: 30,
  },
});


export const loaderStyles = {
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: appColors.grey,
    opacity: 0.3,
    zIndex: 1000,
  },
};
