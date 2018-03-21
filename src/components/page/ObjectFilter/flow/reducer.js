import { combineReducers } from 'redux';
import name from '../components/ViewName/flow/reducer';
import filterCriteria from '../components/FilterCriteria/flow/reducer';
import fields from '../components/FieldsSelection/flow/reducer';

const objectView = combineReducers({
  name,
  filterCriteria,
  fields,
});

export default objectView;