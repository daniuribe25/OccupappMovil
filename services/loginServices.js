export const registerUser = (userInfo) => {
  return fetch('https://occupapp.herokuapp.com/api/users', {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const authUser = (credentials) => {
  return fetch('https://occupapp.herokuapp.com/api/authUser', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  });
};
