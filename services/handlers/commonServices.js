import { AsyncStorage, ToastAndroid } from 'react-native';
import ImageResizer from 'react-native-image-resizer/index.android';

export const storeLocally = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    ToastAndroid.show('Error 001', ToastAndroid.LONG);
  }
};

export const getFromStorage = async (key) => {
  let res = null;
  try {
    res = await AsyncStorage.getItem(key);
  } catch (error) { ToastAndroid.show('Error 002', ToastAndroid.LONG); }
  return res;
};

export const removeFromStorage = (key) => {
  try {
    AsyncStorage.removeItem(key);
  } catch (error) { ToastAndroid.show('Error 004', ToastAndroid.LONG); }
};

export const compressImage = async (uri, maxWidth, maxHeight, quality) => {
  let response = null;
  try {
    response = await ImageResizer.createResizedImage(uri, maxWidth, maxHeight, 'JPEG', quality);
    response.type = 'image/jpeg';
    response.fileName = response.name;
    return response;
  } catch (err) {
    console.log(err);
    return uri;
  }
};

export const handleException = (code, err, comp) => {
  comp.showLoader(false);
  console.log(err);
  ToastAndroid.show(code, ToastAndroid.LONG);
};
