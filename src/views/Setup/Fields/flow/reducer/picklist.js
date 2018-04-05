import { combineReducers } from 'redux';
import {
  SETUP_FIELDS_SET_REPLACE_DIALOG_ATTR,
  SETUP_FIELDS_PICKLIST_VALUE_MANAGEMENT,
  SETUP_FIELDS_PICKLIST_VALUE_TOGGLE_ADDING,
  SETUP_FIELDS_PICKLIST_ADD_RESTRICT_DEPARTMENT_USER,
} from '../actionType';


const replaceDialog = (state = {
  isVisible: false, options: [], selectedOption: {}, replacedValId: '',
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SET_REPLACE_DIALOG_ATTR:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const manageList = (state = {
  valId: '',
  valueText: '',
  visibleTeams: [],
  visibleUsers: [],
  unvisibleTeams: [],
  unvisibleUsers: [],
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_PICKLIST_VALUE_MANAGEMENT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const ui = (state = { isShowAdding: false }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_PICKLIST_VALUE_TOGGLE_ADDING:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const selectedTeam = (state = { allUsers: [], selectedTeamId: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_PICKLIST_ADD_RESTRICT_DEPARTMENT_USER:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
export default combineReducers({
  replaceDialog,
  manageList,
  ui,
  selectedTeam,
});
