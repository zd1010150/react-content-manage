import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import { SETUP_FIELDS_SET_CURRENT_OBJECT, SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS } from './actionType';

/* tableview actions */
export const setCurrentObject = args => ({
  type: SETUP_FIELDS_SET_CURRENT_OBJECT,
  ...args,
});
export const setRelativesObjectTypeFields = args => ({
  type: SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS,
  ...args,
});

export const fetchFields = objectType => dispatch => get(`/admin/metadata/object/${objectType}`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    dispatch(setCurrentObject({
      fields: {
        main: data.main.data,
        cstm: data.cstm.data,
      },
    }));
    dispatch(setRelativesObjectTypeFields({ objectType, data }));
  }
});

export const addUsers = (form, callback) => dispatch => post('/admin/users', { ...form }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    _.isFunction(callback) ? callback() : '';
  }
});
