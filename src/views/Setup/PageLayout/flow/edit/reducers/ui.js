import {
  SETUP_LAYOUT_EDIT_TOGGLE_SECTION_ADD_EDIT_DIALOG,
  SETUP_LAYOUT_EDIT_SET_SECTION_ATTRIBUTE,
  SETUP_LAYOUT_EDIT_SET_CAN_DROP,
  SETUP_LAYOUT_EDIT_SET_CURRENT_TAB,
} from '../actionType';
import { ADD, OPERATES } from '../operateType';

const ui = (state = {
  sectionAddEditDialog: {
    isShow: false, sequence: 0, operate: ADD, label: '', cols: 1,
  },
  fieldCanDrop: true,
  currentTab: OPERATES[0],
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_EDIT_TOGGLE_SECTION_ADD_EDIT_DIALOG:
    case SETUP_LAYOUT_EDIT_SET_SECTION_ATTRIBUTE:
      return Object.assign({}, state, { sectionAddEditDialog: Object.assign({}, state.sectionAddEditDialog, { ...payload }) });
    case SETUP_LAYOUT_EDIT_SET_CAN_DROP:
      return Object.assign({}, state, { fieldCanDrop: payload.canDrop });
    case SETUP_LAYOUT_EDIT_SET_CURRENT_TAB:
      return Object.assign({}, state, { currentTab: payload.tab });
    default:
      return state;
  }
};

export default ui;
