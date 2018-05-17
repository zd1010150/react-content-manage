
import { post } from 'store/http/httpAction';
import _ from 'lodash';
import { fetchLoginUserDetail } from 'store/global/action';
import {
  LOGOUT_SUCCESS,
  DEREGISTER_LOGIN_USER,
} from './actionTypes';

export const deRegisterLoginUser = () => ({
  type: DEREGISTER_LOGIN_USER,
});
const logoutSuccess = json => ({
  type: LOGOUT_SUCCESS,
  payload: { json },
});

export const tryLogin = (values, successMessage, cb) => dispatch => post('/admin/login', values, dispatch, { successMessage })
  .then((json) => {
    debugger;
    if (_.isFunction(cb)) {
      cb();
    }
    if (json) {
      dispatch(fetchLoginUserDetail());
    }
  });

export const tryLogout = successMessage => dispatch => post('/admin/logout', {}, dispatch, { successMessage }).then(() => {
  dispatch(logoutSuccess());
});

