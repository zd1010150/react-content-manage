import { combineReducers } from 'redux';
import EnumsManager from 'utils/EnumsManager';
import { SETUP_USERS_TOGGLE_DEPARTMENT_SELECT_DIALOG, SETUP_USERS_DEPARTMENT, SETUP_USERS_USERS, SETUP_USERS_PAGENATIONS, SETUP_USERS_EDIT_USER, SETUP_USERS_SEARCHKEY } from './actionType';


const users = (state = {
  department_id: '',
  department_text: '',
  users: [],
  editUser: {},
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_USERS_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    case SETUP_USERS_USERS:
      return Object.assign({}, state, { ...payload });
    case SETUP_USERS_EDIT_USER:
      return Object.assign({}, state, { editUser: payload.user });
    default:
      return state;
  }
};
const usersDataTablePagination = (state = { perPage: EnumsManager.DefaultPageConfigs.PageSize, currentPage: 1, total: 0 }, action) => {
  switch (action.type) {
    case SETUP_USERS_PAGENATIONS:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total,
      };
    default:
      return state;
  }
};
const searchKey = (state = { searchKey: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_USERS_SEARCHKEY:
      return Object.assign({}, state, { searchKey: payload.searchKey });
    default:
      return state;
  }
};
const ui = (state = {
  isDisplayDepartmentDialog: false,
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_USERS_TOGGLE_DEPARTMENT_SELECT_DIALOG:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
export default combineReducers({
  ui,
  users,
  usersDataTablePagination,
  searchKey,
});

