import { appConstants } from '../constants/appConstants';

export const fetchCategories = async () => (
  fetch(`${appConstants.API_URL}service_category`, {
    method: 'GET',
  })
);

export const fetchServicesByCategory = async cat => (
  fetch(`${appConstants.API_URL}services_by_category/${cat}`, {
    method: 'GET',
  })
);
