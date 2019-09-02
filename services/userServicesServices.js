import { appConstants } from '../constants/appConstants';

export const registerService = async (ser, isSave) => (
  fetch(`${appConstants.API_URL}user_services`, {
    method: isSave ? 'POST' : 'PATCH',
    body: JSON.stringify(ser),
    headers: { 'Content-Type': 'application/json' },
  })
);

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
  return fetch(`${appConstants.API_URL}user_services_media`, {
    method: isSave ? 'POST' : 'PATCH',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const getUserServicesWithCategories = async (user, limit) => (
  fetch(`${appConstants.API_URL}except_user/${user}?limit=${limit}`, {
    method: 'GET',
  })
);

export const getUserServices = async userId => (
  fetch(`${appConstants.API_URL}getByUser/${userId}`, {
    method: 'GET',
  })
);


export const disableService = service => (
  fetch(`${appConstants.API_URL}disable_service/${service.id}`, {
    method: 'PATCH',
    body: JSON.stringify(service),
    headers: { 'Content-Type': 'application/json' },
  })
);
