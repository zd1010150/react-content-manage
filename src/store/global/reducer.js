/* eslint-disable max-len */
import { combineReducers } from 'redux';
import { navLanguage } from 'utils/navigationUtil';
import { TOGGLE_LANGUAGE, SET_PERMISSION, SET_ACCOUNTINFO, SET_PAGETITLE, SET_ORDER_USER, SET_GLOBAL_SETTING, RESET_USER } from './actionType';

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
const orderUser = (state = null, action) => {
  switch (action.type) {
    case SET_ORDER_USER:
     return action.user;
    case RESET_USER:
      return null;
    default:
      return state;
  }
};



// 将后端传回来的数据进行一层map
const mapSettingData = (data) => {
  const newData = Object.assign({}, data);
  return {
    classification: newData.classification,
    department: newData.department,
    paymentGateway: newData.payment_gateway,
    subCategory: newData.sub_category, // pricesetting 的列，add leads 中的interests 的类别
    subGroup: newData.sub_group, // Array(7){id: 1, name: "no_profits", created_at: null, updated_at: null}{id: 2, name: "svip", created_at: null, updated_at: null}{id: 3, name: "vvip", created_at: null, updated_at: null}{id: 4, name: "vip", created_at: null, updated_at: null}{id: 5, name: "normal", created_at: null, updated_at: null}{id: 6, name: "family", created_at: null, updated_at: null}{id: 7, name: "friends", created_at: null, updated_at: null}
    accountStatus: newData.account_status, // {id: 1, name: "正在处理"}{id: 2, name: "已激活"}{id: 3, name: "已拒绝"}
    accountType: newData.account_type, // {id: 1, name: "散客lead"}{id: 2, name: "散客accounts"} {id: 3, name: "代理"}
    affiliatedClientStatus: newData.affiliated_client_status, // {id: 1, name: "正在处理"}{id: 2, name: "已激活"}{id: 3, name: "已拒绝"} 身份证的状态
    affiliatedClientType: newData.affiliated_client_type, // {id: 1, name: "affiliated_client.sub-leads"} {id: 2, name: "affiliated_client.sub-accounts"}
    deliveryOrderStatus: newData.delivery_order_status,
    orderStatus: newData.order_status,
    orderType: newData.order_type,
    userStatus: newData.user_status,
    freightSetting: newData.freight_setting,
    countries: newData.country,
    baseCurrency: newData.base_currency,
    dutySetting: newData.duty_setting,
    rejectReasons: newData.reject_reasons,
    //baseCurrency: (newData.base_currency && newData.base_currency[0] && newData.base_currency[0].name) || '',
  };
};
const settings = (state = { countries:[], classification: [] }, action) => {
  switch (action.type) {
    case SET_GLOBAL_SETTING:
      return mapSettingData(action.settings);
  default:
      return state;
  }
};

const rootReducer = combineReducers({
  language,
  permission,
  account,
  pageTitle,
  orderUser,
  settings,
});
export default rootReducer;
