import { combineReducers } from 'redux';
import { SET_COMPANY_INFO } from './actionType';
import _ from 'lodash';


const mapFieldsCompanyInfo = (state, companyInfo) => {
  let newState = { ...state };
  if (!_.isEmpty(companyInfo.company)) {
    newState = Object.assign({}, newState, { company: companyInfo.company });
  }
  if (!_.isEmpty(companyInfo.userInfo)) {
    newState = Object.assign({}, newState, { userInfo: companyInfo.userInfo });
  }
  return newState;
};
const companyinfo = (state = {
  company: {
    name: '',
    phone: '',
    fax: '',
    address: '',
    country_code: '',
    fiscal_year_starts: '',
    time_zone: '',
    used_data_space: '',
    file_storage: '',
    language: '',
    modify_by_id: 1,
    updated_at: '2018-03-12 02:21:34',
    user: {
      id: 1,
      name: '',
    },
    logo: {
      path: '',

    },
  },
  userInfo: {
    total: 0,
    activeCount: 0,
    inactiveCount: 0,
  },

}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SET_COMPANY_INFO:
      return mapFieldsCompanyInfo(state, payload);
    default:
      return state;
  }
};


export default combineReducers({
  companyinfo,
});

