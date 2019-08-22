import { loginTypes } from '../../reduxConstants';
import { language as languageSP } from '../../../I18n/spanish';

const initialState = {
  language: languageSP,
  loginInfo: {},
  userInfo: {},
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.STORE_LOGIN_INFO:
      return {
        ...state,
        loginInfo: action.payLoad,
      };
    case loginTypes.STORE_USER_INFO:
      return {
        ...state,
        userInfo: action.payLoad,
      };
    default:
      return state;
  }
};

export default loginReducer;
