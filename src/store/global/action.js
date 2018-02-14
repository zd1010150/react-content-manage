import { get, post } from 'store/http/httpAction';
import _ from 'lodash';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_ORDER_USER, SET_GLOBAL_SETTING, RESET_USER } from './actionType';


export const toggleLanguage = language => ({
  type: TOGGLE_LANGUAGE,
  language,
});
export const setAccountInfo = account => ({
  type: SET_ACCOUNTINFO,
  account,
});
export const setPermission = permission => ({
  type: SET_PERMISSION,
  permission,
});
export const setPageTitle = pageTitle => ({
  type: SET_PAGETITLE,
  pageTitle,
});
export const setOrderUser = user => ({
  type: SET_ORDER_USER,
  user,
});
export const resetUser = () => ({
  type: RESET_USER,
});

const setGlobalSetting = settings => ({
  type: SET_GLOBAL_SETTING,
  settings,
});
export const fetchGlobalSetting = () => dispatch => get('/affiliate/global-settings', {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setGlobalSetting(data));

  }
});

export const fetchAccountInfo = () => dispatch => post('/affiliate/me').then((data) => {
  if (!_.isEmpty(data) && !_.isEmpty(data.user)) {
    dispatch(setAccountInfo(data.user));
  }
});


