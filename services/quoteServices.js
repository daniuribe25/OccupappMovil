export const registerQuote = (quote) => {
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
  // return fetch('https://occupapp.herokuapp.com/api/quote', {
  return fetch('http://10.0.2.2:3000/api/quote', {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};
