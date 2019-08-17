import { AsyncStorage, ToastAndroid } from 'react-native';
import CompressImage from 'react-native-compress-image';

export const storeLocally = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) { ToastAndroid.show('Error 001', ToastAndroid.LONG); }
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
    response = await CompressImage.createCustomCompressedImage(uri, 'Compress/Images', maxWidth, maxHeight, quality);
    return response.uri;
  } catch (err) {
    console.log(err);
  }
};
