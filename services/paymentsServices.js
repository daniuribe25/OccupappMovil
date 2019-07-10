export const registerPayment = (payment) => {
  return fetch('https://occupapp.herokuapp.com/api/payments', {
  // return fetch('http://10.0.2.2:3000/api/payment', {
    method: 'POST',
    body: JSON.stringify(payment),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const getUserPayments = (userId) => {
  return fetch(`https://occupapp.herokuapp.com/api/user_payments/${userId}`, {
  // return fetch('http://10.0.2.2:3000/api/user_services', {
    method: 'GET',
  });
};

export const disbursPayments = (id) => {
  return fetch(`https://occupapp.herokuapp.com/api/disbursPayments/${id}`, {
  // return fetch(`http://10.0.2.2:3000/api/disbursPayments/${id}`, {
    method: 'GET',
  });
};
