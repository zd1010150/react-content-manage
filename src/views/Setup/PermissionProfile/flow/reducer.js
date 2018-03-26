import { combineReducers } from 'redux';
import { SETUP_PERPRO_SET_SELECTED_DEPARTMENT, SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG, SETUP_PERPRO_SET_SELECTED_PERMISSION } from './actionType';
import allPermissions from './permissions';

const permissions = (state = allPermissions) => state;
const selectedDepartment = (state = { department_name: '', department_id: '', permissions: [] }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_PERPRO_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    case SETUP_PERPRO_SET_SELECTED_PERMISSION:
      const isSuperAdmin = payload.permissions.indexOf(allPermissions.superAdmin.value) > -1;
      let ps = [];
      if (isSuperAdmin) {
        const { tabs, pages } = allPermissions;
        ps = tabs.map(t => t.value).concat(Object.keys(pages).reduce((values, key) => values.concat(pages[key].map(t => t.value)), []));
      }else {
        ps = payload.permissions;
      }
      return Object.assign({}, state, { permissions: ps });
    default:
      return state;
  }
};
const ui = (state = { isDisplayDepartmentDialog: false }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG:
      return Object.assign({}, state, { isDisplayDepartmentDialog: payload.isDisplayDepartmentDialog });
    default:
      return state;
  }
};

export default combineReducers({
  selectedDepartment,
  ui,
  permissions,
});

