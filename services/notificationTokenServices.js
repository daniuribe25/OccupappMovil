import { appConstants } from '../constants/appConstants';

export const registerNotificationToken = async nt => (
  fetch(`${appConstants.API_URL}notificationToken`, {
    method: 'POST',
    body: JSON.stringify(nt),
    headers: { 'Content-Type': 'application/json' },
  })
);
