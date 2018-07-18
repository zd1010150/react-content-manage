import { OPERATES } from '../operateType';
import {
  SETUP_LAYOUT_EDIT_TOGGLE_SECTION_ADD_EDIT_DIALOG,
  SETUP_LAYOUT_EDIT_SET_SECTION_ATTRIBUTE,
  SETUP_LAYOUT_EDIT_SET_CAN_DROP,
  SETUP_LAYOUT_EDIT_SET_CURRENT_TAB,
  SETUP_LAYOUT_EDIT_FIELD,
} from '../actionType';


const ui = (state = {
  sectionAddEditDialog: {
    isShow: false,
    sequence: 0,
    operate: '',
    label: '',
    cols: 1,
    code: '',
  },
  fieldEditDialog: {
    isShow: false,
    fieldLabel: '',
    fieldId: '',
    sectionCode: '',
    requiredValue: '',
    requiredDisable: false,
    readOnlyValue: '',
    readOnlyDisable: false,
    showValue: '',
  },
  fieldCanDrop: true,
  currentTab: OPERATES[1],
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
    case SETUP_LAYOUT_EDIT_FIELD:
      return Object.assign({}, state, { fieldEditDialog: Object.assign({}, state.fieldEditDialog, { ...payload }) });
    default:
      return state;
  }
};

export default ui;
