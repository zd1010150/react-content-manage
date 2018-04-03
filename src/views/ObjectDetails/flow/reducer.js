import { combineReducers } from 'redux';
import toolbar from '../components/Toolbar/flow/reducer';
// import fieldDetails from '../components/FieldDetails/flow/reducer';

const objectDetails = combineReducers({
  toolbar
  // fieldDetails,
});

export default objectDetails;