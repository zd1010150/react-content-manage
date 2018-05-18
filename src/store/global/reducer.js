/* eslint-disable max-len, no-case-declarations */
import _ from 'lodash';
import { combineReducers } from 'redux';
import { flattenTree } from 'utils/common';
import { moments, years } from 'utils/dateTimeUtils';
import { navLanguage } from 'utils/navigationUtil';
import Enums from 'utils/EnumsManager';
import { getStore, setStore } from 'utils/localStorage';
import { DEFAULT_DATE_SETTING } from 'config/app.config';
import { LOGIN_SUCCESS } from 'views/LoginForm/flow/actionTypes';
import { SET_ACCOUNTINFO,
  SET_GLOBAL_SETTING,
  SET_LOGO,
  SET_PAGETITLE,
  SET_PERMISSION,
  SET_TEAMS_GLOBAL,
  SET_USERS_GLOBAL,
  TOGGLE_LANGUAGE,
  SET_APP_ROUTER_HASH,
  SET_TIME_ZONE,
} from './actionType';

const { LocalStorageKeys, DateTimeConfigs } = Enums;
const { User, Timezone, LanguaegOfApp } = LocalStorageKeys;
const {
  DefaultDateFormat,
  DefaultTimeFormat,
  DefaultOffset,
  DateFormatKey,
  TimeFormatKey,
} = DateTimeConfigs;


const setTimezoneInStorage = (timezones = [], countries = []) => {
  const user = getStore(User);
  const parsedUser = JSON.parse(user);
  const companySettings = parsedUser && parsedUser.company ? parsedUser.company : {};
  const timezone = timezones.find(tz => tz.id === companySettings.time_zone);
  const country = countries.find(cty => cty.id === companySettings.country_code);
  return setStore(Timezone, {
    [DateFormatKey]: country && country.date_format ? country.date_format : DefaultDateFormat,
    [TimeFormatKey]: country && country.time_format ? country.time_format : DefaultTimeFormat,
    offset: timezone && timezone.tz_offset ? timezone.tz_offset : DefaultOffset,
  });
};


const initLanugae = `${getStore(LanguaegOfApp)}` === 'null' || `${getStore(LanguaegOfApp)}` === 'undefined' ? navLanguage : getStore(LanguaegOfApp);

const language = (state = initLanugae, action) => {
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
  setStore(LanguaegOfApp, globalLanguage);
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
      setTimezoneInStorage(action.settings.timezones, action.settings.countries);
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

const appRoutHash = (state = Math.random(), action) => {
  switch (action.type) {
    case SET_APP_ROUTER_HASH:
      return action.hash;
    default:
      return state;
  }
};

const getTimeZone = (state, globalSetting, loginUser) => {
  const { countries, timeZones } = globalSetting;
  const { country_code, time_zone } = loginUser.company;
  let newDateFormat = {};
  let newOffset = {};

  const countryArr = countries.filter(c => c.id === country_code);
  const country = _.isEmpty(countryArr) ? { date_format: DEFAULT_DATE_SETTING.DATE_FORMAT } : countryArr[0];
  newDateFormat = {
    dateFormat: country.date_format || DEFAULT_DATE_SETTING.DATE_FORMAT,
  };
  newDateFormat = Object.assign({}, newDateFormat, { timeFormat: `${newDateFormat.dateFormat} HH:mm:ss` });

  const timeZoneArr = timeZones.filter(t => t.id === time_zone);
  const timeZone = _.isEmpty(timeZoneArr) ? { tz_offset: DEFAULT_DATE_SETTING.OFFSET } : timeZoneArr[0];
  newOffset = {
    offset: timeZone.tz_offset,
  };
  const newState = Object.assign({}, state, { ...newDateFormat }, { ...newOffset });
  setStore(Enums.LocalStorageKeys.Timezone, JSON.stringify(newState));
  return newState;
};

const timeZoneSetting = (state = { dateFormat: DEFAULT_DATE_SETTING.DATE_FORMAT, timeFormat: DEFAULT_DATE_SETTING.TIME_FORMAT, offset: DEFAULT_DATE_SETTING.OFFSET }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SET_TIME_ZONE:
      return getTimeZone(state, payload.globalSetting, payload.loginUser);
    case LOGIN_SUCCESS:
      return getTimeZone(state, payload.globalSetting, payload.payload.data);
    case SET_GLOBAL_SETTING:
      return getTimeZone(state, { timeZones: payload.settings.timezones, countries: payload.settings.countries }, payload.loginUser);
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
  appRoutHash,
  timeZoneSetting,
});
export default rootReducer;
