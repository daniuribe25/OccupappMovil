import { appConstants } from '../constants/appConstants';

export const registerQuote = async (quote) => {
  const formData = new FormData();
  Object.keys(quote).forEach((key) => {
    if (key === 'quoteMedia') {
      const media = quote[key];
      for (let x = 0; x < media.length; x += 1) {
        formData.append(key, media[x]);
      }
    } else {
      formData.append(key, quote[key]);
    }
  });
  return fetch(`${appConstants.API_URL}quote`, {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const getUserQuotes = async userId => (
  fetch(`${appConstants.API_URL}user_quote/${userId}`, {
    method: 'GET',
  })
);

export const getQuote = async id => (
  fetch(`${appConstants.API_URL}quote/${id}`, {
    method: 'GET',
  })
);

export const answerQuote = async quote => (
  fetch(`${appConstants.API_URL}quote`, {
    method: 'PATCH',
    body: JSON.stringify(quote),
    headers: { 'Content-Type': 'application/json' },
  })
);

export const rateService = async (rating, quoteId) => (
  fetch(`${appConstants.API_URL}rate_service`, {
    method: 'PATCH',
    body: JSON.stringify({ rating, quoteId }),
    headers: { 'Content-Type': 'application/json' },
  })
);
