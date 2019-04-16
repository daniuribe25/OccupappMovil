import { combineReducers } from 'redux';
import loginReducer from './session/loginReducer';

export default combineReducers({
  login: loginReducer,
});
