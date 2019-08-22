import { loginTypes } from '../../reduxConstants';
import { registerUser, authUser } from '../../../services/loginServices';

export const authenticateUser = loginInfo => (dispach) => {
  dispach({
    type: loginTypes.STORE_LOGIN_INFO,
    payLoad: loginInfo,
  });
  return authUser(loginInfo);
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
  // userInfo = {
  //   email: 'dani.uribe43@gmail.com',
  //   password: 'daniuribe',
  //   name: 'Dani',
  //   lastName: 'Uribe',
  //   cel: '324235345234',
  //   birthday: '1993-11-24',
  //   profileImage: userInfo.profileImage,
  // };
  return registerUser(userInfo);
};
