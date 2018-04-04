import { TOGGLE_SECTION_ADD_EDIT_DIALOG, SET_SECTION_ATTRIBUTE, SET_CAN_DROP } from '../actionType';
import { ADD } from '../operateType';

const ui = (state = {
  sectionAddEditDialog: {
    isShow: false, sequence: 0, operate: ADD, label: '', cols: 1,
  },
  fieldCanDrop: true,
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case TOGGLE_SECTION_ADD_EDIT_DIALOG:
    case SET_SECTION_ATTRIBUTE:
      return Object.assign({}, state, { sectionAddEditDialog: Object.assign({}, state.sectionAddEditDialog, { ...payload }) });
    case SET_CAN_DROP:
      return Object.assign({}, state, { fieldCanDrop: payload.canDrop });
    default:
      return state;
  }
};

export default ui;
