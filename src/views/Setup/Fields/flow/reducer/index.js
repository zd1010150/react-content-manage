import { combineReducers } from 'redux';
import tableViewReducer from './tableView';
import addFieldReducer from './addField';
import editFieldReducer from './editField';
import picklistReducer from './picklist';

const setupFields = combineReducers({
  tableView: tableViewReducer,
  addField: addFieldReducer,
  editField: editFieldReducer,
  picklist: picklistReducer,
});
export default setupFields;
