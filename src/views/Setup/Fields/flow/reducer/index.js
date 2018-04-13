import { combineReducers } from 'redux';
import tableViewReducer from './tableView';
import addFieldReducer from './addField';
import picklistReducer from './picklist';

const setupFields = combineReducers({
  tableView: tableViewReducer,
  addField: addFieldReducer,
  picklist: picklistReducer,
});
export default setupFields;
