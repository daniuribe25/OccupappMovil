import { loginTypes } from '../../reduxConstants';

export const authenticateUser = loginInfo => (dispach) => {
  dispach({
    type: loginTypes.STORE_LOGIN_INFO,
    payLoad: loginInfo,
  });
};

export const storeLoginInfo = userInfo => dispach => dispach({
  type: loginTypes.STORE_LOGIN_INFO,
  payLoad: userInfo,
});

export const registerUserInfo = userInfo => (dispach) => {
  dispach({
    type: loginTypes.STORE_USER_INFO,
    payLoad: userInfo,
  });
};
