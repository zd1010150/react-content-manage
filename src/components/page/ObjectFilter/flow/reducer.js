import { combineReducers } from 'redux';
import name from '../components/ViewName/flow/reducer';
import filterCriteria from '../components/FilterCriteria/flow/reducer';

const objectView = combineReducers({
  name,
  filterCriteria,
});

export default objectView;