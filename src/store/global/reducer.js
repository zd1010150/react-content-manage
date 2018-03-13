/* eslint-disable max-len */
import { combineReducers } from 'redux';
import { moments, years } from 'utils/dateTimeUtils';
import { navLanguage } from 'utils/navigationUtil';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_GLOBAL_SETTING, SET_TEAMS } from './actionType';

// 页面默认语言为 en，此处只是mock

const language = (state = navLanguage, action) => {
  let globalLanguage;
  switch (action.type) {
    case TOGGLE_LANGUAGE:
      globalLanguage = action.language;
      break;
    default:
      globalLanguage = state;
      break;
  }
  window.globalLanguage = globalLanguage;
  return globalLanguage;
};
// 权限需要从后端接口获取
const permission = (state = {}, action) => {
  switch (action.type) {
    case SET_PERMISSION:
      return action.permission;
    default:
      return state;
  }
};
// 账户信息
const account = (state = { username: 'DANDAN' }, action) => {
  switch (action.type) {
    case SET_ACCOUNTINFO:
      return action.account;
    default:
      return state;
  }
};
const pageTitle = (state = 'global.pageTitle.leads', action) => {
  switch (action.type) {
    case SET_PAGETITLE:
      return action.pageTitle;
    default:
      return state;
  }
};


const mapSettingData = (state, data) => Object.assign({}, state, {
  timeZones: data.timezones,
  languages: data.languages,
  countries: data.countries,
  fields: data.fields,
  model: data.model,
});
const settings = (state = {
  timeZones: [],
  languages: [],
  countries: [],
  fields: {},
  model: {},
  moments,
  years,
  teams: [],
}, action) => {
  switch (action.type) {
    case SET_GLOBAL_SETTING:
      return mapSettingData(state, action.settings);
    case SET_TEAMS:
      return Object.assign({}, state, { teams: action.teams });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  language,
  permission,
  account,
  pageTitle,
  settings,
});
export default rootReducer;
