import { post } from 'store/http/httpAction';
import _ from 'lodash';
import { MY_SETTING_SET_AVATOR } from './actionType';

export const setAvator = avator => ({
  type: MY_SETTING_SET_AVATOR,
  avator,
});

export const updatePwd = (args, cb) => dispatch => post('/admin/users/me/reset_password', { ...args }, dispatch).then(() => {
  if (_.isFunction(cb)) {
    cb();
  }
});
