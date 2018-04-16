import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  SETUP_FIELDS_SET_CURRENT_OBJECT,
  SETUP_FIELDS_SET_ADDED_ATTR,
  SETUP_FIELDS_SET_FIELD_ATTR,
  SETUP_FIELDS_RESET_ADDED_ATTR,
  SETUP_FIELDS_SET_OBJECT_LAYOUT,
  SETUP_FIELDS_SET_FIELD_LABEL_IS_DUPLICATE,
  SETUP_FIELDS_DELETE_PICKLIST_VALUE,
  SETUP_FIELDS_ADD_PICKLIST_VALUE,
} from '../actionType';
import { fieldCategory } from '../objectTypeHelper';


const originState = {
  objType: '',
  field: {
    name: '',
    notnull: 0,
    type: '',
    label: '',
    length: 0,
    scale: 2,
    precision: 4,
    helpText: '',
    description: '',
    category: fieldCategory.CUSTOM,
    id: '',
  },
  picklist: [],
  deactiveList: [],
  appendPageLayoutIds: [],
};

const addedField = (state = { ...originState }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SET_CURRENT_OBJECT:
      if (!_.isEmpty(payload.objType)) { return Object.assign({}, state, { objType: payload.objType }); }
      return state;
    case SETUP_FIELDS_SET_FIELD_ATTR:
      return Object.assign({}, state, { field: Object.assign({}, state.field, { ...payload }) });
    case SETUP_FIELDS_SET_ADDED_ATTR:
      return Object.assign({}, state, { ...payload });
    case SETUP_FIELDS_RESET_ADDED_ATTR:
      return Object.assign({}, originState, { ...payload });
    case SETUP_FIELDS_DELETE_PICKLIST_VALUE:
      return Object.assign({}, state, { picklist: payload.picklist });
    case SETUP_FIELDS_ADD_PICKLIST_VALUE:
      return Object.assign({}, state, { picklist: state.picklist.slice().concat([payload.val]) });
    default:
      return state;
  }
};
const backgroundInfo = (state = { layouts: [] }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SET_OBJECT_LAYOUT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
const isDuplicate = (state = false, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SET_FIELD_LABEL_IS_DUPLICATE:
      return payload.isDuplicate;
    default:
      return state;
  }
};
export default combineReducers({
  addedField,
  backgroundInfo,
  isDuplicate,
});
