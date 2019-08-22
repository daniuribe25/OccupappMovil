import { homeTypes } from '../../reduxConstants';
import { language as languageSP } from '../../../I18n/spanish';

const initialState = {
  language: languageSP,
  socket: {},
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case homeTypes.STORE_SOCKET:
      return {
        ...state,
        socket: action.payLoad,
      };
    default:
      return state;
  }
};

export default homeReducer;
