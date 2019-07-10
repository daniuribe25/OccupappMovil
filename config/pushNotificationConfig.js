import OneSignal from 'react-native-onesignal';
import { Platform, ToastAndroid } from 'react-native';
import { storeLocally, getFromStorage } from '../services/handlers/commonServices';
import { registerNotificationToken } from '../services/notificationTokenServices';

const onIds = async (device) => {
  const user = JSON.parse(await getFromStorage('user-data'));
  const token = JSON.parse(await getFromStorage('token'));
  if (token) {
    if (token.email === user.email && token.token === device.userId) return;
  }
  registerNotificationToken({ token: device.userId, userId: user._id, platform: Platform.OS })
    .then(req => req.json())
    .then((resp) => {
      if (resp.success) {
        storeLocally('token', { token: device.userId, email: user.email });
      }
    }).catch(() => { ToastAndroid.show('Error 008', ToastAndroid.LONG); });
};

export const pushNotificationConfig = (onReceive, onOpened) => {
  OneSignal.init('368c949f-f2ef-4905-8c78-4040697f38cf');

  OneSignal.addEventListener('received', onReceive);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  OneSignal.inFocusDisplaying(2);
  OneSignal.configure();
};
