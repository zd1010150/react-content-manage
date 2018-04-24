import { combineReducers } from 'redux';
import name from '../components/ViewName/flow/reducer';
import filterCriteria from '../components/FilterCriteria/flow/reducer';
import fields from '../components/FieldsSelection/flow/reducer';
import visibilities from '../components/ViewVisibility/flow/reducer';
import actions from '../components/ViewActions/flow/reducer';

const objectView = combineReducers({
  name,
  filterCriteria,
  fields,
  visibilities,
  actions,
});

export default objectView;
