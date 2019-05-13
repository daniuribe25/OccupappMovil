export const registerUser = (userInfo) => {
  const formData = new FormData();
  Object.keys(userInfo).forEach((key) => {
    if (userInfo[key].uri) {
      formData.append('profileImage', {
        uri: userInfo[key].uri,
        type: userInfo[key].type,
        name: userInfo[key].fileName,
      });
    } else {
      formData.append(key, userInfo[key]);
    }
  });

  return fetch('https://occupapp.herokuapp.com/api/users', {
  // return fetch('http://10.0.2.2:3000/api/users', {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const authUser = (credentials) => {
  return fetch('https://occupapp.herokuapp.com/api/authUser', {
  // return fetch('http://10.0.2.2:3000/api/authUser', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const getUserByEmail = (email) => {
  return fetch(`https://occupapp.herokuapp.com/api/usersByEmail/${email}`, {
    method: 'GET',
  });
};

export const recoverPassword = (email) => {
  return fetch(`https://occupapp.herokuapp.com/api/recoverPassword/${email}`, {
  // return fetch(`http://10.0.2.2:3000/api/recoverPassword/${email}`, {
    method: 'GET',
  });
};
