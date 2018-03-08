import { combineReducers } from 'redux';
import filter from '../components/Filter/flow/reducer';
import table from '../components/Table/flow/reducer';

const leads = combineReducers({
  filter,
  table,
});

export default leads;