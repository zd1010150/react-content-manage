/* eslint-disable max-len */
import { combineReducers } from 'redux';
import { moments } from 'utils/dateTimeUtils';
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
  timeZones: data.time_zones,
  hours: [{ val: '9:20' }],
});
const settings = (state = {
  timeZones: [{ id: 1, text: '北京时间' }, { id: 2, text: '悉尼时间' }],
  hours: [],
  moments,
  teams: JSON.parse('[{"id":1,"name":"team1","parent_id":0,"child_team_rec":[{"id":2,"name":"team2","parent_id":1,"child_team_rec":[{"id":5,"name":"team5","parent_id":2,"child_team_rec":[{"id":10,"name":"team10","parent_id":5,"child_team_rec":[]}]},{"id":6,"name":"team6","parent_id":2,"child_team_rec":[{"id":7,"name":"team7","parent_id":6,"child_team_rec":[]}]}]},{"id":3,"name":"team3","parent_id":1,"child_team_rec":[{"id":8,"name":"team8","parent_id":3,"child_team_rec":[]},{"id":9,"name":"team9","parent_id":3,"child_team_rec":[]}]},{"id":4,"name":"team4","parent_id":1,"child_team_rec":[]}]}]'),
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
