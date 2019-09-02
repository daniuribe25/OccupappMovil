import OneSignal from 'react-native-onesignal';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';
import { storeLocally, getFromStorage, handleException } from '../services/handlers/commonServices';
import { registerNotificationToken } from '../services/notificationTokenServices';
import { appColors } from '../styles/colors';

PushNotification.configure({
  onNotification: (notification) => { console.log(notification); },
});

const onIds = async (device) => {
  const user = JSON.parse(await getFromStorage('user-data'));
  const token = JSON.parse(await getFromStorage('token'));
  if (token) {
    if (token.email === user.email && token.token === device.userId) return;
  }
  try {
    const req = await registerNotificationToken({ token: device.userId, userId: user._id, platform: Platform.OS });
    const resp = await req.json();
    if (resp.success) {
      storeLocally('token', { token: device.userId, email: user.email });
    }
  } catch (err) { handleException('016', err, this); }
};

export const pushNotificationConfig = (onReceive, onOpened) => {
  OneSignal.init('368c949f-f2ef-4905-8c78-4040697f38cf');

  OneSignal.addEventListener('received', onReceive);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
  OneSignal.inFocusDisplaying(2);
  OneSignal.configure();
};

export const showNotification = (not) => {
  PushNotification.localNotification({
    id: '1234',
    largeIcon: 'ic_launcher',
    smallIcon: 'ic_notification',
    bigText: 'My big text that will be shown when notification is expanded',
    subText: 'This is a subText',
    color: appColors.primary,
    vibration: 300,
    title: not.payload.title,
    message: not.payload.body,
  });
};
