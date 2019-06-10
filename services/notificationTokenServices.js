export const registerNotificationToken = (nt) => {
  return fetch('https://occupapp.herokuapp.com/api/notificationToken', {
  // return fetch('http://10.0.2.2:3000/api/notificationToken', {
    method: 'POST',
    body: JSON.stringify(nt),
    headers: { 'Content-Type': 'application/json' },
  });
};
