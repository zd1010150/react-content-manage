
import { post } from 'store/http/httpAction';
import _ from 'lodash';
import {
  LOGIN_SUCCESS, LOGOUT_SUCCESS,
} from './actionTypes';


export const loginSuccess = args => ({
  type: LOGIN_SUCCESS,
  ...args,
});


const logoutSuccess = json => ({
  type: LOGOUT_SUCCESS,
  payload: { json },
});

export const tryLogin = (values, successMessage) => dispatch => post('/admin/login', values, dispatch, { successMessage })
  .then((json) => {
    if (json && (!_.isEmpty(json.data))) {
      dispatch(loginSuccess(json.data));
    }
  });

export const tryLogout = successMessage => dispatch => post('/admin/logout', {}, dispatch, { successMessage }).then(() => {
  dispatch(logoutSuccess());
});

