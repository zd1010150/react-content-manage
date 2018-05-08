import _ from 'lodash';
import { get, post } from 'store/http/httpAction';
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
} from './actionType';

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
const setGlobalSetting = settings => ({
  type: SET_GLOBAL_SETTING,
  settings,
});
export const fetchGlobalSetting = () => dispatch => get('/admin/global-settings', {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setGlobalSetting(data));
  }
});

export const fetchAccountPermission = () => dispatch => get('/admin/permissions/me').then((data) => {
  dispatch(setPermission((data && data.permissions) || []));
});


export const fetchTeams = () => dispatch => get('/admin/teams/struct/info').then((data) => {
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
  get('/admin/users/all').then((data) => {
    if (data && data.data) {
      dispatch(setUsers(data.data));
    }
  })
;


//
export const tryFetchAllTeamsIfNeeded = () => (dispatch, getState) =>
  // TODO: check current state of teams substore to avoid unnecessary fetch
  get('/admin/teams/struct/info').then((data) => {
    if (data && data.teams) {
      dispatch(setTeams(data.teams));
    }
  });

