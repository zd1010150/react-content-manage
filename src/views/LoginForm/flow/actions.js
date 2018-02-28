import {
  LOGIN_SUCCESS, LOGINOROUT_FAILURE, LOGOUT_SUCCESS,
} from './actionTypes';
import { getStore } from '../../../utils/localStorage';
import EnumsManager from '../../../utils/EnumsManager';

const generateRequest = (url, fetchType = "GET", bodyContent = {}) => {
  const requestConfig = {
    method: fetchType,
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authentication': bodyContent.token ? bodyContent.token : '',
    }),
  }
  if (fetchType !== "GET" && !_.isEmpty(bodyContent)) {
    requestConfig.body = JSON.stringify(bodyContent);
  }
  const request = new Request(url, requestConfig);
  return request;
};

const loginSuccess = json => ({
  type: LOGIN_SUCCESS,
  payload: { json },
});

const loginOrOutFailed = () => ({
  type: LOGINOROUT_FAILURE,
});

export const tryLogin = values => {
  const request = generateRequest('https://api.staging.breakable.com/v1/admin/login', 'POST', values);
  return function(dispatch, getState) {
    return fetch(request)
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        })
      ))
      .then(({ status, json }) => {
        if (status >= 400) {
          dispatch(loginOrOutException())
        } else {
          dispatch(loginSuccess(json))
        }
      })
      .catch(error =>
        dispatch(loginOrOutException())
      )
  }
};


const logoutSuccess = json => ({
  type: LOGOUT_SUCCESS,
  payload: { json },
});

export const tryLogout = () => {
  const loginUser = JSON.parse(getStore(EnumsManager.LocalStorageKey));
  const token = loginUser ? loginUser.access_token : '';
  const request = generateRequest('https://api.staging.breakable.com/v1/admin/logout', 'POST', { token });
  return function(dispatch, getState) {
    return fetch(request)
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        })
      ))
      .then(({ status, json }) => {
        if (status >= 400) {
          dispatch(loginOrOutFailed())
        } else {
          dispatch(logoutSuccess(json));
        }
      })
      .catch(error =>
        dispatch(loginOrOutFailed())
      )
  }
};