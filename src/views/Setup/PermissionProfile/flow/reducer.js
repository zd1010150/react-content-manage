import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  SETUP_PERPRO_SET_SELECTED_DEPARTMENT,
  SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG,
  SETUP_PERPRO_SET_SELECTED_PERMISSION,
  SETUP_PERPRO_SET_ALL_PERMISSIONS,
  SETUP_PERPRO_SET_EXPAND_KEYS,
} from './actionType';

const permissions = (state = {}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_PERPRO_SET_ALL_PERMISSIONS:
      return payload.permissions;
    default:
      return state;
  }
};
export const getAllPermissionIds = (permissions) => {
  if (_.isEmpty(permissions)) {
    return [];
  }
  const permissionIds = [];
  const getId = (root) => {
    permissionIds.push(`${root.id}`);
    if (!_.isEmpty(root.child_rec)) {
      Object.keys(root.child_rec).forEach(t => getId(t));
    }
  };
  Object.keys(permissions).forEach((t) => {
    getId(permissions[t]);
  });
  return permissionIds;
};
const selectedDepartment = (state = {
  department_name: '', department_id: '', description: '', permissions: [],
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_PERPRO_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    case SETUP_PERPRO_SET_SELECTED_PERMISSION:
      return Object.assign({}, state, { permissions: payload.permissions });
    default:
      return state;
  }
};
const ui = (state = { isDisplayDepartmentDialog: false, treeExpandKeys: [] }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG:
      return Object.assign({}, state, { isDisplayDepartmentDialog: payload.isDisplayDepartmentDialog });
    case SETUP_PERPRO_SET_EXPAND_KEYS:

      return Object.assign({}, state, { treeExpandKeys: payload.keys });
    case SETUP_PERPRO_SET_ALL_PERMISSIONS:
      return Object.assign({}, state, { treeExpandKeys: getAllPermissionIds(payload.permissions) });
    case SETUP_PERPRO_SET_SELECTED_PERMISSION:
      if (payload.isFromRemote) {
        return Object.assign({}, state, { treeExpandKeys: payload.permissions });
      } return state;

    default:
      return state;
  }
};

export default combineReducers({
  selectedDepartment,
  ui,
  permissions,
});

