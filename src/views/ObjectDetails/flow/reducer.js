import { combineReducers } from 'redux';
import toolbar from '../components/Toolbar/flow/reducer';
import primaryDetails from '../components/PrimaryDetails/flow/reducer';
import tasks from '../components/TaskPanels/flow/reducer';

const objectDetails = combineReducers({
  toolbar,
  primaryDetails,
  tasks,
});

export default objectDetails;
