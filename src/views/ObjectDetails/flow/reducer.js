import { combineReducers } from 'redux';
import toolbar from '../components/Toolbar/flow/reducer';
import primaryDetails from '../components/PrimaryDetails/flow/reducer';

const objectDetails = combineReducers({
  toolbar,  
  primaryDetails,
});

export default objectDetails;