/* eslint-disable max-len */
import { combineReducers } from 'redux';
import { flattenTree } from 'utils/common';
import { moments, years } from 'utils/dateTimeUtils';
import { navLanguage } from 'utils/navigationUtil';
import { SET_ACCOUNTINFO, SET_GLOBAL_SETTING, SET_LOGO, SET_PAGETITLE, SET_PERMISSION, SET_TEAMS_GLOBAL, SET_USERS_GLOBAL, TOGGLE_LANGUAGE } from './actionType';

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
const permissions = (state = [], action) => {
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
  conditions: data.list_view.conditions,
  assignOptions: data.list_view.assign_options,
  categories: data.file.category,
  statuses: data.task.statuses,
  priorities: data.task.priorities,
});
const settings = (state = {
  timeZones: [],
  languages: [],
  countries: [],
  fields: { crm_data_type: [], cstm_attribute_prefix: '' },
  model: {},
  moments,
  years,
  teams: [],
  users: [],
  conditions: [],
  assignOptions: [],
  categories: [],
  statuses: [],
  priorities: [],
}, action) => {
  switch (action.type) {
    case SET_GLOBAL_SETTING:
      return mapSettingData(state, action.settings);
    case SET_TEAMS_GLOBAL:
      return {
        ...state,
        teams: action.teams,
        flatTeams: flattenTree(action.teams),
      };

    case SET_USERS_GLOBAL:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};

const companyLogo = (state = '', action) => {
  switch (action.type) {
    case SET_GLOBAL_SETTING:
      return (action.settings.company && action.settings.company.logoUrl) || '';
    case SET_LOGO:
      return action.logo;
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  language,
  permissions,
  account,
  pageTitle,
  settings,
  companyLogo,
});
export default rootReducer;
