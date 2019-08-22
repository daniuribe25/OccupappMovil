import { combineReducers } from 'redux';
import loginReducer from './session/loginReducer';
import homeReducer from './session/homeReducer';

export default combineReducers({
  login: loginReducer,
  home: homeReducer,
});
