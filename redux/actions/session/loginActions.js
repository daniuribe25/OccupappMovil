import loginTypes from '../../reduxConstants';
import { registerUser, authUser } from '../../../services/loginServices';

export const authenticateUser = loginInfo => (dispach) => {
  console.log('entré a redux storeAuthUser');
  console.log(loginInfo);
  dispach({
    type: loginTypes.STORE_LOGIN_INFO,
    payLoad: loginInfo,
  });
  return authUser({ email: 'dani.uribe21@gmail.com', password: 'daniuribe' });
};

export const storeUserInfo = userInfo => dispach => dispach({
  type: loginTypes.STORE_USER_INFO,
  payLoad: userInfo,
});

export const registerUserInfo = userInfo => (dispach) => {
  dispach({
    type: loginTypes.STORE_USER_INFO,
    payLoad: userInfo,
  });
  userInfo = {
    email: 'dani.uribe12@gmail.com',
    password: 'daniuribe',
    name: 'Dani',
    lastName: 'Uribe',
    cel: '324235345234',
    birthday: '1993-11-24',
  };
  return registerUser(userInfo);
};