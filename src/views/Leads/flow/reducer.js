import { combineReducers } from 'redux';
import filter from '../components/Filter/flow/reducer';

const leads = combineReducers({
  filter
});

export default leads;