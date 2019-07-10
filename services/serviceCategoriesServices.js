export const fetchCategories = () => {
  return fetch('https://occupapp.herokuapp.com/api/service_category', {
  // return fetch('http://10.0.2.2:3000/api/service_category', {
    method: 'GET',
  });
};

export const fetchServicesByCategory = (cat) => {
  return fetch(`https://occupapp.herokuapp.com/api/services_by_category/${cat}`, {
  // return fetch(`http://10.0.2.2:3000/api/services_by_category/${cat}`, {
    method: 'GET',
  });
};
