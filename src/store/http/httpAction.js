import http from 'utils/http';
import _ from 'lodash';
import { notification } from 'antd';
import { UNAUTHENTICATION, SUCCESS_HTTP_CODE } from 'config/app.config.js';
import { deRegisterLoginUser } from 'views/LoginForm/flow/actions';
import {
  HTTP_ACTION_DONE,
  HTTP_ACTION_DOING,
  HTTP_ACTION_ERROR,
} from './constants';
import allInfos from 'i18n/global/info';

import { addError } from '../error/action';

const successNotify = (message) => {
  notification.success({
    message,
    duration: 3,
  });
};

const defaultCallback = (callbackConfig, method, requestResult = { data: {}, statusCode: 0 }) => {
  const { successMessage, callbackAction } = callbackConfig;
  const info = allInfos[window.globalLanguage];
  // Check with _.isEmpty on js function will return true
  if (_.isFunction(callbackAction)) {
    callbackAction(requestResult);
  } else if (SUCCESS_HTTP_CODE.indexOf(requestResult.statusCode) > -1 && method !== 'get') {
    if (!_.isEmpty(successMessage)) {
      successNotify(successMessage);
    } else {
      successNotify(info[method]);
    }
  }
};
const dispatch = (method, url, request, dispatcher = () => {}, callbackConfig) => {
  dispatcher({
    type: HTTP_ACTION_DOING,
    payload: {},
  });
  return request.then(({ data, statusCode }) => {
    dispatcher({ type: HTTP_ACTION_DONE });
    defaultCallback(callbackConfig, method, { data, statusCode });
    if (statusCode === UNAUTHENTICATION.CODE) { // 如果是401为授权
      dispatcher(deRegisterLoginUser());
      return Promise.reject();
    }
    if (SUCCESS_HTTP_CODE.indexOf(statusCode) > -1) {
      return data;
    }
    if (data && (data.error || data.errors || data.message)) {
      let { errors } = data;
      errors = errors || data.status_code;
      if (!_.isEmpty(data.errors)) {
        Object.keys(errors).forEach((key) => {
          const msgs = errors[key];
          msgs.forEach((msg) => {
            dispatcher(addError(msg));
          });
        });
      } else if (data.error) {
        dispatcher(addError(data.error));
      } else if (data.message) {
        dispatcher(addError(data.message));
      }
      return Promise.reject();
    }
  }).catch((err) => {
    dispatcher({
      type: HTTP_ACTION_ERROR,
    });
    return Promise.reject(err);
  });
};

export const post = (url, data = {}, dispatcher, callbackConfig = { successMessage: '', callbackAction: null }, httpConfig = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('post', url, http('post', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));

export const get = (url, data, dispatcher, callbackConfig = { successMessage: '', callbackAction: null }, httpConfig = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('get', url, http('get', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));

export const httpDelete = (url, data, dispatcher, callbackConfig = { successMessage: '', callbackAction: null }, httpConfig = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('httpDelete', url, http('delete', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));

export const patch = (url, data, dispatcher, callbackConfig = { successMessage: '', callbackAction: null }, httpConfig = { realHeaders: {}, apiDomain: '' }) =>
  (dispatch('patch', url, http('patch', url, data, httpConfig.realHeaders, httpConfig.apiDomain), dispatcher, callbackConfig));
