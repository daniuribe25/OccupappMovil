import axios from 'axios';

export const registerUser = (userInfo) => {
  const formData = new FormData();

  Object.keys(userInfo).forEach((key) => {
    if (key !== 'profileImage') {
      formData.append(key, userInfo[key]);
    } else {
      formData.append('profileImage', {
        uri: userInfo[key].uri,
        type: userInfo[key].type,
        name: userInfo[key].fileName,
      });
    }
  });

  userInfo.profileImage = {
    uri: userInfo.profileImage.uri,
    type: userInfo.profileImage.type,
    name: userInfo.profileImage.fileName,
  };

  // return fetch('https://occupapp.herokuapp.com/api/users', {
  // return fetch('http://192.168.1.12:3000/api/users', {
  return fetch('http://10.0.2.2:3000/api/users', {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const authUser = (credentials) => {
  return fetch('https://occupapp.herokuapp.com/api/authUser', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  });
};
