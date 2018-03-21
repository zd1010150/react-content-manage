import { combineReducers } from 'redux';
import { SETUP_ORGCHARTSET_SORTABLE_VIEW_VISIBLE,
  SETUP_ORGCHARTSET_NEW_DEPARTMENT_NAME,
  SETUP_ORGCHARTRESET_NEW_DEPARMENT,
  SETUP_ORGCHARTSET_SELECTED_DEPARTMENT,
  SETUP_ORGCHARTSET_ADD_VISIBLE,
  SETUP_ORGCHARTSET_USER,
  SETUP_ORGCHARTSET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  SETUP_ORGCHARTSET_SELECT_USER,
  SETUP_ORGCHARTSET_SORTING_TEAM,
} from './actionType';

const selectedDepartment = (state = { id: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_ORGCHARTSET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const selectedUser = (state = { id: '', name: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_ORGCHARTSET_SELECT_USER:
      return payload.user;
    default:
      return state;
  }
};
const newTeam = (state = { parentId: '', parentName: '', name: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_ORGCHARTSET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { parentId: payload.id });
    case SETUP_ORGCHARTSET_NEW_DEPARTMENT_NAME:
      return Object.assign({}, state, { name: payload.name });
    case SETUP_ORGCHARTRESET_NEW_DEPARMENT:
      return Object.assign({}, state, { name: '', parentId: '' });
    default:
      return state;
  }
};

const allUsers = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_ORGCHARTSET_USER:
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
    case SETUP_ORGCHARTSET_SORTABLE_VIEW_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case SETUP_ORGCHARTSET_ADD_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case SETUP_ORGCHARTSET_SELECTED_USER_TEAM_DIALOG_VISIBLE:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

const sortingTeams = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_ORGCHARTSET_SORTING_TEAM:
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

