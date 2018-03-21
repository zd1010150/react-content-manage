import { combineReducers } from 'redux';
import { SETUP_PERPRO_SET_SELECTED_DEPARTMENT, SETUP_PERPRO_TOGGLE_DEPARTMENT_DIALOG } from './actionType';
import allPermissions from './permissions';

const permissions = (state = allPermissions) => state;
const selectedDepartment = (state = { department_name: '', department_id: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_PERPRO_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
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

