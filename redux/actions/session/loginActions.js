import loginTypes from '../../reduxConstants';
import { registerUser, authUser } from '../../../services/loginServices';

export const storeLoginInfo = loginInfo => (dispach) => {
  console.log('entré a redux storeLoginInfo');
  console.log(loginInfo);
  authUser({ email: 'dani.uribe21@gmail.com', password: 'daniuribe' }).then((resp) => {
    console.log(resp.json);
    dispach({
      type: loginTypes.STORE_LOGIN_INFO,
      payLoad: loginInfo,
    });
  }).catch((err) => {
    console.error(err);
  });
};

export const storeUserInfo = userInfo => dispach => dispach({
  type: loginTypes.STORE_USER_INFO,
  payLoad: userInfo,
});
