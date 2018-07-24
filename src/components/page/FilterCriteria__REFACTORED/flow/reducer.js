import { combineReducers } from 'redux';
import {
  SET_FIELDS,
  ADD_CRITERION,
  SET_CRITERION,
  REMOVE_CRITERION,
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


    default:
      return state;
  }
};

export default combineReducers({
  criteria,
  logic,
});
