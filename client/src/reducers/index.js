import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import sale from './sale';

export default combineReducers({
  alert,
  auth,
  sale
});
