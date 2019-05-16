export const getUserServicesWithCategories = (limit) => {
  return fetch(`https://occupapp.herokuapp.com/api/user_services?limit=${limit}`, {
  // return fetch('http://10.0.2.2:3000/api/user_services', {
    method: 'GET',
  });
};
