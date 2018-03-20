import { combineReducers } from 'redux';
import name from '../components/ViewName/flow/reducer';

const objectView = combineReducers({
  name,
});

export default objectView;