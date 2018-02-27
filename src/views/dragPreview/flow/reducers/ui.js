import { TOGGLE_SECTION_ADD_EDIT_DIALOG, SET_SECTION_ATTRIBUTE, SET_CAN_DROP } from '../actionType';


const ui = (state = {
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
