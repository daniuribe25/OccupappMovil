import { appConstants } from '../constants/appConstants';

export const registerPayment = async payment => (
  fetch(`${appConstants.API_URL}payments`, {
    method: 'POST',
    body: JSON.stringify(payment),
    headers: { 'Content-Type': 'application/json' },
  })
);

export const getUserPayments = async userId => (
  fetch(`${appConstants.API_URL}user_payments/${userId}`, {
    method: 'GET',
  })
);

export const updatePayment = async (email, quote) => (
  fetch(`${appConstants.API_URL}update_payment/${email}`, {
    method: 'POST',
    body: JSON.stringify(quote),
    headers: { 'Content-Type': 'application/json' },
  })
);

export const disbursPayments = async id => (
  fetch(`${appConstants.API_URL}disbursPayments/${id}`, {
    method: 'GET',
  })
);

export const getPaymentUrl = async preferences => (
  fetch(`${appConstants.API_URL}setPaymentPreferences`, {
    method: 'POST',
    body: JSON.stringify(preferences),
    headers: { 'Content-Type': 'application/json' },
  })
);
