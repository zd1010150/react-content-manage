import { OPERATES } from '../operateType';
import {
  SETUP_LAYOUT_EDIT_TOGGLE_SECTION_ADD_EDIT_DIALOG,
  SETUP_LAYOUT_EDIT_SET_SECTION_ATTRIBUTE,
  SETUP_LAYOUT_EDIT_SET_CAN_DROP,
  SETUP_LAYOUT_EDIT_SET_CURRENT_TAB,
  SETUP_LAYOUT_EDIT_FIELD,
} from '../actionType';

const setupLayoutEditField = (fieldEditDialog, payload) => {
  if (payload.readOnlyDisable === false || payload.requiredDisable === false) {
    return {
      ...fieldEditDialog,
      ...payload,
      readOnlyDisable: payload.showValue[0] !== 'readOnly' && payload.showValue.length !== 0,
      requiredDisable: payload.showValue[0] !== 'required' && payload.showValue.length !== 0,
    };
  }
  return {
    ...fieldEditDialog,
    ...payload,
  };
};

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
    requiredDisable: false,
    readOnlyDisable: false,
    showValue: [],
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
      return {
        ...state,
        fieldEditDialog: setupLayoutEditField(state.fieldEditDialog, payload),
      };
      // Object.assign({}, state, { fieldEditDialog: Object.assign({}, state.fieldEditDialog, { ...payload }) });
    default:
      return state;
  }
};

export default ui;
