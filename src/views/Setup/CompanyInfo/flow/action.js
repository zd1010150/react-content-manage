import { get, patch } from 'store/http/httpAction';
import _ from 'lodash';

import { SETUP_COMINFO_COMPANY_INFO } from './actionType';

export const setCompanyInfo = args => ({
  type: SETUP_COMINFO_COMPANY_INFO,
  ...args,
});


export const getCompanyInfo = callback => dispatch => get('/admin/companies/me', {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setCompanyInfo(data));
  }
  if (_.isFunction(callback)) {
    callback(data);
  }
});

export const updateCompanyInfo = (form, callback) => dispatch => patch('/admin/companies/me', { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    if (_.isFunction(callback)) {
      callback();
    }
  }
});

