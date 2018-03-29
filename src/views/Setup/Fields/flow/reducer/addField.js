import { combineReducers } from 'redux';
import _ from 'lodash';
import {
  SETUP_FIELDS_SET_CURRENT_OBJECT,
  SETUP_FIELDS_SET_ADDED_ATTR,
  SETUP_FIELDS_RESET_ADDED_ATTR,
  SETUP_FIELDS_SET_OBJECT_LAYOUT } from '../actionType';
import { fieldCategory } from '../objectTypeHelper';


const originState = {
  objType: '',
  field: {
    name: '', notnull: 0, type: '', label: '', length: 0, scale: 2, precision: 4, helpText: '', description: '', category: fieldCategory.CUSTOM,
  },
  picklist: [],
  appendPageLayoutIds: [],
};

const addedField = (state = { ...originState }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_FIELDS_SET_CURRENT_OBJECT:
      if (!_.isEmpty(payload.objType)) { return Object.assign({}, state, { objType: payload.objType }); }
      return state;
    case SETUP_FIELDS_SET_ADDED_ATTR:
      return Object.assign({}, state, { ...payload });
    case SETUP_FIELDS_RESET_ADDED_ATTR:
      return Object.assign({}, originState, { ...payload });
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

export default combineReducers({
  addedField,
  backgroundInfo,
});
