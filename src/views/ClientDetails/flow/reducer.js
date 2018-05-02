import { combineReducers } from 'redux';
import details from 'components/page/PrimaryDetails/flow/reducer';
// import tools from 'components/page/DetailsToolbar/flow/reducer';
import toolbar from '../../../components/page/DetailsToolbar/flow/reducer';
// TODO: combine modules

export default combineReducers({
  details,
  toolbar,
});
