
import { post } from 'store/http/httpAction';
import _ from 'lodash';
import {
  LOGIN_SUCCESS, LOGOUT_SUCCESS,
} from './actionTypes';


export const loginSuccess = (userData, globalSetting) => ({
  type: LOGIN_SUCCESS,
   : { userData },
  globalSetting,
});


const logoutSuccess = json => ({
  type: LOGOUT_SUCCESS,
  payload: { json },
});

export const tryLogin = (values, successMessage) => (dispatch, getState) => post('/admin/login', values, dispatch, { successMessage })
  .then((json) => {
    if (json && (!_.isEmpty(json.data))) {
      dispatch(loginSuccess(json.data, getState().global.settings));
    }
  });

export const tryLogout = successMessage => dispatch => post('/admin/logout', {}, dispatch, { successMessage }).then(() => {
  dispatch(logoutSuccess());
});

