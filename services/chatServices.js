export const getChats = (user) => {
  return fetch(`https://occupapp.herokuapp.com/api/chats/${user}`, {
  // return fetch(`http://10.0.2.2:3000/api/chats/${user}`, {
    method: 'GET',
  });
};
