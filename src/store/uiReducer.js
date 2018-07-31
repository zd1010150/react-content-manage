import { combineReducers } from 'redux';
import { rightSider } from 'components/page/RightSider/flow/reducer';
import { pageLoading } from 'components/page/PageLoading/flow/reducer';

export default combineReducers({
  rightSider,
  pageLoading,
});
