import { appConstants } from '../constants/appConstants';

export const registerUser = async (userInfo, isUpdate) => {
  const formData = new FormData();
  Object.keys(userInfo).forEach((key) => {
    if (userInfo[key] && userInfo[key].fileName) {
      formData.append('profileImage', {
        uri: userInfo[key].uri,
        type: userInfo[key].type,
        name: userInfo[key].fileName,
      });
    } else {
      formData.append(key, userInfo[key]);
    }
  });

  return fetch(`${appConstants.API_URL}users`, {
    method: isUpdate ? 'PATCH' : 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const updatePassword = async passwords => (
  fetch(`${appConstants.API_URL}updatePass`, {
    method: 'POST',
    body: JSON.stringify(passwords),
    headers: { 'Content-Type': 'application/json' },
  })
);

export const authUser = async credentials => (
  fetch(`${appConstants.API_URL}authUser`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  })
);

export const getUserByEmail = async email => (
  fetch(`${appConstants.API_URL}usersByEmail/${email}`, {
    method: 'GET',
  })
);

export const recoverPassword = async email => (
  fetch(`${appConstants.API_URL}recoverPassword/${email}`, {
    method: 'GET',
  })
);

export const linkDaviplata = async dp => (
  fetch(`${appConstants.API_URL}linkDaviplata`, {
    method: 'POST',
    body: JSON.stringify(dp),
    headers: { 'Content-Type': 'application/json' },
  })
);
