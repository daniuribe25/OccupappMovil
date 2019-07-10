export const registerService = (quote) => {
  const formData = new FormData();
  Object.keys(quote).forEach((key) => {
    if (key === 'serviceMedia') {
      const media = quote[key];
      for (let x = 0; x < media.length; x += 1) {
        formData.append(key, media[x]);
      }
    } else {
      formData.append(key, quote[key]);
    }
  });
  // return fetch('https://occupapp.herokuapp.com/api/user_services', {
  return fetch('http://10.0.2.2:3000/api/user_services', {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const getUserServicesWithCategories = (limit) => {
  return fetch(`https://occupapp.herokuapp.com/api/user_services?limit=${limit}`, {
  // return fetch('http://10.0.2.2:3000/api/user_services', {
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
