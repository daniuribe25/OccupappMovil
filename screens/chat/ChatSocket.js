import { storeLocally, getFromStorage } from '../../services/handlers/commonServices';

const getChatNumbers = async () => {
  const sChatNumber = await getFromStorage('chatNumber');
  if (sChatNumber && sChatNumber !== '') {
    return JSON.parse(sChatNumber);
  }
  return {};
};

export const setNewMessage = async (resp) => {
  const sChatNumber = await getChatNumbers();
  sChatNumber[resp.chatId] = sChatNumber[resp.chatId] ? +sChatNumber[resp.chatId] + 1 : 1;
  await storeLocally('chatNumber', sChatNumber);
};
