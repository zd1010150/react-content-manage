import { combineReducers } from 'redux';
import EnumsManager from 'utils/EnumsManager';
import { TOGGLE_DEPARTMENT_SELECT_DIALOG, SET_DEPARTMENT, SET_USERS, SET_PAGENATIONS, SET_EDIT_USER } from './actionType';


const users = (state = {
  department_id: '',
  department_text: '',
  users: [],
  editUser: {},
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SET_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    case SET_USERS:
      return Object.assign({}, state, { ...payload });
    case SET_EDIT_USER:
      return Object.assign({}, state, { editUser: { ...payload }, department_id: payload.team_id, department_text: '主管部门' });
    default:
      return state;
  }
};
const usersDataTablePagination = (state = { perPage: EnumsManager.DefaultPageConfigs.PageSize, currentPage: 1, total: 0 }, action) => {
  switch (action.type) {
    case SET_PAGENATIONS:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total,
      };
    default:
      return state;
  }
};
const ui = (state = {
  isDisplayDepartmentDialog: false,
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case TOGGLE_DEPARTMENT_SELECT_DIALOG:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
export default combineReducers({
  ui,
  users,
  usersDataTablePagination,
});

