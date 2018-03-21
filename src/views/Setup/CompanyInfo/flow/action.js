import { get, patch } from 'store/http/httpAction';
import _ from 'lodash';

import { SET_COMPANY_INFO } from './actionType';

export const setCompanyInfo = args => ({
  type: SET_COMPANY_INFO,
  ...args,
});


export const getCompanyInfo = () => dispatch => get('/admin/companies/me', {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setCompanyInfo(data));
  }
});

export const updateCompanyInfo = (form, callback) => dispatch => patch('/admin/companies/me', { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(getCompanyInfo({ company: data }));
    if (_.isFunction(callback)) {
      callback();
    }
  }
});

