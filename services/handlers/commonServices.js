import { AsyncStorage, ToastAndroid } from 'react-native';

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
