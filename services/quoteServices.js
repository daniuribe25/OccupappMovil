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
  return fetch('https://occupapp.herokuapp.com/api/quote', {
  // return fetch('http://10.0.2.2:3000/api/quote', {
    method: 'POST',
    body: formData,
    headers: { accept: '*/*' },
  });
};

export const getUserQuotes = (userId) => {
  return fetch(`https://occupapp.herokuapp.com/api/user_quote/${userId}`, {
  // return fetch('http://10.0.2.2:3000/api/user_services', {
    method: 'GET',
  });
};

export const getQuote = (id) => {
  return fetch(`https://occupapp.herokuapp.com/api/quote/${id}`, {
  // return fetch('http://10.0.2.2:3000/api/user_services', {
    method: 'GET',
  });
};

export const answerQuote = (quote) => {
  return fetch('https://occupapp.herokuapp.com/api/quote', {
  // return fetch('http://10.0.2.2:3000/api/quote', {
    method: 'PATCH',
    body: JSON.stringify(quote),
    headers: { 'Content-Type': 'application/json' },
  });
};
