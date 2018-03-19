import { combineReducers } from 'redux';
import { ORGCHART_SET_SORTABLE_VIEW_VISIBLE,
  ORGCHART_SET_NEW_DEPARTMENT_NAME,
  ORGCHART_RESET_NEW_DEPARMENT,
  ORGCHART_SET_SELECTED_DEPARTMENT,
  ORGCHART_SET_ADD_VISIBLE,
  ORGCHART_SET_USER,
  ORGCHART_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  ORGCHART_SET_SELECT_USER,
  ORGCHART_SET_SORTING_TEAM,
} from './actionType';

const selectedDepartment = (state = { id: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ORGCHART_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const selectedUser = (state = { id: '', name: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ORGCHART_SET_SELECT_USER:
      return payload.user;
    default:
      return state;
  }
};
const newTeam = (state = { parentId: '', parentName: '', name: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ORGCHART_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { parentId: payload.id });
    case ORGCHART_SET_NEW_DEPARTMENT_NAME:
      return Object.assign({}, state, { name: payload.name });
    case ORGCHART_RESET_NEW_DEPARMENT:
      return Object.assign({}, state, { name: '', parentId: '' });
    default:
      return state;
  }
};

const allUsers = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ORGCHART_SET_USER:
      return payload.users;
    default:
      return state;
  }
};
const ui = (state = {
  isSortViewVisible: false,
  isAddVisible: false,
  isSelectTeamDialogVisible: false,
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ORGCHART_SET_SORTABLE_VIEW_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case ORGCHART_SET_ADD_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case ORGCHART_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

const sortingTeams = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case ORGCHART_SET_SORTING_TEAM:
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

