export const registerQuote = (quote) => {
  const formData = new FormData();
  Object.keys(quote).forEach((key) => {
    formData.append(key, quote[key]);
  });

  // return fetch('https://occupapp.herokuapp.com/api/quote', {
  return fetch('http://10.0.2.2:3000/api/quote', {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};
