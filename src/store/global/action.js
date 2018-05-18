import _ from 'lodash';
import { get, post } from 'store/http/httpAction';
import { LOGIN_SUCCESS } from 'views/LoginForm/flow/actionTypes';
import { RESET_USER,
  SET_ACCOUNTINFO,
  SET_GLOBAL_SETTING,
  SET_LOGO,
  SET_PAGETITLE,
  SET_USERS_GLOBAL,
  SET_PERMISSION,
  SET_TEAMS_GLOBAL,
  TOGGLE_LANGUAGE,
  SET_APP_ROUTER_HASH,
  SET_TIME_ZONE,
} from './actionType';

/**
 * when page refresh fetch the current  user detail in order to get the latest information . As the previous user detail is set when login,so there invoke the  LOGIN_SUCCESS ,
 * this code will be restructured in the feature
 * TODO
 * @param payload
 */
export const setUserDetail = (payload, globalSetting) => ({
  type: LOGIN_SUCCESS,
  payload,
  globalSetting,
});
export const setTimeZone = (globalSetting, loginUser) => ({
  type: SET_TIME_ZONE,
  globalSetting,
  loginUser,
});
export const setRouterHash = hash => ({
  type: SET_APP_ROUTER_HASH,
  hash,
});
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

export const resetUser = () => ({
  type: RESET_USER,
});
export const setTeams = teams => ({
  type: SET_TEAMS_GLOBAL,
  teams,
});
export const setLogo = logo => ({
  type: SET_LOGO,
  logo,
});
const setGlobalSetting = (settings, loginUser) => ({
  type: SET_GLOBAL_SETTING,
  settings,
  loginUser,
});
export const fetchGlobalSetting = () => (dispatch, getState) => get('/admin/global-settings', {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    const { loginUser } = getState();
    dispatch(setGlobalSetting(data, loginUser));
  }
});

export const fetchAccountPermission = () => dispatch => get('/admin/permissions/me', {}, dispatch).then((data) => {
  dispatch(setPermission((data && data.permissions) || []));
});

export const fetchLoginUserDetail = () => (dispatch, getState) => get('/admin/me', {}, dispatch).then((data) => {
  dispatch(setUserDetail(data, getState().global.settings));
});

export const fetchTeams = () => dispatch => get('/admin/teams/struct/info', {}, dispatch).then((data) => {
  if (data && !_.isEmpty(data.teams)) {
    const params = setTeams(data.teams);
    dispatch(params);
  }
});


//
export const setUsers = users => ({
  type: SET_USERS_GLOBAL,
  users,
});

export const tryFetchAllUsersIfNeeded = () => (dispatch, getState) =>
  // TODO: check current state of users substore to avoid unnecessary fetch
  get('/admin/users/all', {}, dispatch).then((data) => {
    if (data && data.data) {
      dispatch(setUsers(data.data));
    }
  })
;


//
export const tryFetchAllTeamsIfNeeded = () => (dispatch, getState) =>
  // TODO: check current state of teams substore to avoid unnecessary fetch
  get('/admin/teams/struct/info',{}, dispatch).then((data) => {
    if (data && data.teams) {
      dispatch(setTeams(data.teams));
    }
  });

