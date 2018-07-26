import { combineReducers } from 'redux';
import {
  SET_FIELDS,
  ADD_CRITERION,
  SET_CRITERION,
  REMOVE_CRITERION,
  SET_SIDER_RECORD,
  SET_FIELD_OPTIONS,
} from './actionTypes';
import {
  formatFields,
  sortFieldsByLabel,
  getNewCriterion,
  getMaxDisplayNum,
  updateFiltersByColumn,
} from '../utils/flowUtils';

/**
 * Condition Logic Reducer
 */
const logic = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
};
/**
 * Right side bar Reducer
 */
const siderInitialState = {
  record: null,
};
const sider = (state = siderInitialState, action) => {
  switch (action.type) {
    case SET_SIDER_RECORD:
      const { criterion } = action.payload;
      if (!criterion) return state;
      return {
        ...state,
        record: criterion,
      };


    case REMOVE_CRITERION:
      return siderInitialState;


    default:
      return state;
  }
};

/**
 * Filter Criteria Reducer
 */
const initialState = {
  criteria: [],
  fields: [],
};

const criteria = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELDS:
      const { fields } = action.payload;
      const sortedFields = sortFieldsByLabel(fields);
      const formattedFields = formatFields(sortedFields);
      return {
        ...state,
        fields: formattedFields,
      };


    case ADD_CRITERION:
      const maxDisplayNum = getMaxDisplayNum(state.criteria);
      const newCriterion = getNewCriterion(maxDisplayNum);
      return {
        ...state,
        criteria: [...state.criteria, newCriterion],
      };


    case SET_CRITERION:
      return {
        ...state,
        criteria: updateFiltersByColumn(action.payload.column, action.payload, state),
      };


    case REMOVE_CRITERION:
      const { removedDisplayNum } = action.payload;
      return {
        ...state,
        criteria: state.criteria.filter(c => c.displayNum !== removedDisplayNum),
      };


    case SET_FIELD_OPTIONS:
      const { options, criterion } = action.payload;
      const updatedFields = state.fields.map((f) => {
        if (f.id === criterion.fieldId) {
          f.options = options;
          f.fetched = true;
        }
        return f;
      });
      return {
        ...state,
        fields: updatedFields,
      };

    default:
      return state;
  }
};

export default combineReducers({
  criteria,
  sider,
  logic,
});
