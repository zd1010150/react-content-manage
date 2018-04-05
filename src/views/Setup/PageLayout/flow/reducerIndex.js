import { combineReducers } from 'redux';
import tableViewReducer from './reducer/tableView';
import editReducer from './edit/reducers/index';
import { SETUP_LAYOUT_SET_CURRENT_OBJECT } from './actionType';

const currentObjectType = (state = '', action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_SET_CURRENT_OBJECT:
      return payload.objType;
    default:
      return state;
  }
};
const setupLayouts = combineReducers({
  tableView: tableViewReducer,
  edit: editReducer,
  currentObjectType,
});
export default setupLayouts;
