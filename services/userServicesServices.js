export const registerService = async (ser, isSave) => {
  // return fetch('https://occupapp.herokuapp.com/api/user_services', {
  return fetch('http://127.0.0.1:3000/api/user_services', {
    method: isSave ? 'POST' : 'PATCH',
    body: JSON.stringify(ser),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const registerServiceMedia = async (ser, isSave) => {
  const formData = new FormData();
  Object.keys(ser).forEach((key) => {
    if (key === 'serviceMedia') {
      const media = ser[key];
      for (let x = 0; x < media.length; x += 1) {
        formData.append(key, media[x]);
      }
    } else {
      formData.append(key, ser[key]);
    }
  });
  // return fetch('https://occupapp.herokuapp.com/api/user_services', {
  return fetch('http://127.0.0.1:3000/api/user_services_media', {
    method: isSave ? 'POST' : 'PATCH',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const getUserServicesWithCategories = (limit) => {
  // return fetch(`https://occupapp.herokuapp.com/api/user_services?limit=${limit}`, {
  return fetch(`http://127.0.0.1:3000/api/user_services?limit=${limit}`, {
    method: 'GET',
  });
};

export const getUserServices = (userId) => {
  return fetch(`https://occupapp.herokuapp.com/api/getByUser/${userId}`, {
  // return fetch(`http://10.0.2.2:3000/api/getByUser/${userId}`, {
    method: 'GET',
  });
};


export const disableService = (service) => {
  return fetch(`https://occupapp.herokuapp.com/api/disable_service/${service.id}`, {
  // return fetch(`http://10.0.2.2:3000/api/disable_service/${service._id}`, {
    method: 'PATCH',
    body: JSON.stringify(service),
    headers: { 'Content-Type': 'application/json' },
  });
};
