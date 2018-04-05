import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  SETUP_LAYOUT_SET_ALL_LAYOUTS,
  SETUP_LAYOUT_ADD_LAYOUT,
} from '../actionType';


const allLayouts = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_SET_ALL_LAYOUTS:
      return payload.layouts || [];
    default:
      return state;
  }
};
const addLayout = (state = { isShowDialog: false, existingLayout: '', layoutName: '' }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_ADD_LAYOUT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
export default combineReducers({
  allLayouts,
  addLayout,
});
