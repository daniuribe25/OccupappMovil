import { appConstants } from '../constants/appConstants';

export const getChats = async user => (
  fetch(`${appConstants.API_URL}chats/${user}`, {
    method: 'GET',
  })
);
