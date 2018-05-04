import { combineReducers } from 'redux';
import details from 'components/page/PrimaryDetails/flow/reducer';
import toolbar from 'components/page/DetailsToolbar/flow/reducer';
import subpanels from 'components/page/DetailsSubpanels/flow/reducer';

export default combineReducers({
  details,
  toolbar,
  subpanels,
});
