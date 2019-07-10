export const registerUser = (userInfo, isUpdate) => {
  const formData = new FormData();
  Object.keys(userInfo).forEach((key) => {
    if (userInfo[key].fileName) {
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
    method: isUpdate ? 'PATCH' : 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const updatePassword = (passwords) => {
  return fetch('https://occupapp.herokuapp.com/api/updatePass', {
  // return fetch('http://10.0.2.2:3000/api/updatePass', {
    method: 'POST',
    body: JSON.stringify(passwords),
    headers: { 'Content-Type': 'application/json' },
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

export const linkDaviplata = (dp) => {
  return fetch('https://occupapp.herokuapp.com/api/linkDaviplata', {
  // return fetch('http://10.0.2.2:3000/api/linkDaviplata', {
    method: 'POST',
    body: JSON.stringify(dp),
    headers: { 'Content-Type': 'application/json' },
  });
};
