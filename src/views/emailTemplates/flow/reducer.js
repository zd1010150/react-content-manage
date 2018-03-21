import { combineReducers } from 'redux';
import { EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME,
  EMAIL_TEMPLATES_RESET_NEW_DEPARMENT,
  EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT,
  EMAIL_TEMPLATES_SET_ADD_VISIBLE,
  EMAIL_TEMPLATES_SET_USER,
  EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  EMAIL_TEMPLATES_SET_SELECT_USER,
  EMAIL_TEMPLATES_SET_SORTING_TEAM,
  EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE
} from './actionType';

const selectedDepartment = (state = { id: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const selectedUser = (state = { id: '', name: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SELECT_USER:
      return payload.user;
    default:
      return state;
  }
};
const newTeam = (state = { parentId: '', parentName: '', name: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { parentId: payload.id });
    case EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME:
      return Object.assign({}, state, { name: payload.name });
    case EMAIL_TEMPLATES_RESET_NEW_DEPARMENT:
      return Object.assign({}, state, { name: '', parentId: '' });
    default:
      return state;
  }
};

const allUsers = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_USER:
      return payload.users;
    default:
      return state;
  }
};
const ui = (state = {
  isEditFolderViewVisible: false,
  isAddVisible: false,
  isSelectTeamDialogVisible: false,
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_SET_ADD_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE:
        return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

const sortingTeams = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SORTING_TEAM:
      return payload.sortingTeams.slice();
    default:
      return state;
  }
};
export default combineReducers({
  ui,
  newTeam,
  selectedDepartment,
  allUsers,
  selectedUser,
  sortingTeams,
});

