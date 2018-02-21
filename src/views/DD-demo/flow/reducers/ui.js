import { TOGGLE_SECTION_ADD_EDIT_DIALOG, SET_SECTION_LABEL } from '../actionType';
import { ADD } from '../operateType';

const ui = (state = {
  sectionAddEditDialog: {
    isShow: false, sequence: 0, operate: ADD, label: '',
  },
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case TOGGLE_SECTION_ADD_EDIT_DIALOG:
    case SET_SECTION_LABEL:
      return Object.assign({}, state, { sectionAddEditDialog: Object.assign({}, state.sectionAddEditDialog, { ...payload }) });
    default:
      return state;
  }
};

export default ui;
