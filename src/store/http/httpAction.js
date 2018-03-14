import http from 'utils/http';
import { notification } from 'antd';
import { UNAUTHENTICATION } from 'config/app.config.js';
import { tryLogout } from 'views/LoginForm/flow/actions';
import _ from 'lodash';
import {
  HTTP_ACTION_DONE,
  HTTP_ACTION_DOING,
  HTTP_ACTION_ERROR,
} from './constants';
import allInfos from 'i18n/global/info';

import { addError } from '../error/action';

const successNotify = (method, url) => {
  if (method === 'get' || url.indexOf('/admin/login') > -1) {
    return;
  }
  const info = allInfos[window.globalLanguage];
  notification.success({
    message: info[method],
    duration: 3,
  });
};
const dispatch = (method, url, request, dispatcher = () => {}) => {
  dispatcher({
    type: HTTP_ACTION_DOING,
    payload: {},
  });
  return request.then((data) => {
    if (data.status_code === UNAUTHENTICATION.CODE) { // 如果是401为授权，就跳转到登录界面
      dispatch(tryLogout());
    }
    if (data.errors || data.status_code) {
      let { errors } = data;
      errors = errors || data.status_code;
      if (!_.isEmpty(data.errors)) {
        Object.keys(errors).forEach((key) => {
          const msgs = errors[key];
          msgs.forEach((msg) => {
            dispatcher(addError(msg));
          });
        });
      } else {
        dispatcher(addError(data.message));
      }
    } else {
      dispatcher({
        type: HTTP_ACTION_DONE,
        payload: {
          data,
        },
      });
      successNotify(method, url);
      return data;
    }
  }).catch((err) => {
    dispatcher({
      type: HTTP_ACTION_ERROR,
      payload: {
        err,
      },
    });
    return Promise.reject(err);
  });
};

export const post = (url, data = {}, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch('post', url, http('post', url, data, realHeaders, apiDomain), dispatcher));

export const get = (url, data, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch('get', url, http('get', url, data, realHeaders, apiDomain), dispatcher));

export const httpDelete = (url, data, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch('httpDelete', url, http('delete', url, data, realHeaders, apiDomain), dispatcher));

export const patch = (url, data, dispatcher, apiDomain = '', realHeaders = {}) =>
  (dispatch('patch', url, http('patch', url, data, realHeaders, apiDomain), dispatcher));
