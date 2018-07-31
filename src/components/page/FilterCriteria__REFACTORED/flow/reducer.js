import { combineReducers } from 'redux';
import {
  SET_CRITERIA,
  SET_FIELDS,
  SET_LOGIC,
  ADD_CRITERION,
  SET_CRITERION,
  REMOVE_CRITERION,
  SET_SIDER_RECORD,
  SET_FIELD_OPTIONS,
  RESET_CRITERIA,
} from './actionTypes';
import {
  formatCriteria,
  formatFields,
  sortFieldsByLabel,
  getNewCriterion,
  getMaxDisplayNum,
  updateFiltersByColumn,
} from '../utils/flowUtils';

/**
 * Condition Logic Reducer
 */
const logicInitialState = '';
const logic = (state = logicInitialState, action) => {
  switch (action.type) {
    case SET_LOGIC:
      return action.payload.newLogic;


    case RESET_CRITERIA:
      return logicInitialState;


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
    case RESET_CRITERIA:
      return siderInitialState;


    default:
      return state;
  }
};

/**
 * Filter Criteria Reducer
 */
const criteriaInitialState = {
  criteria: [],
  fields: [],
};

const criteria = (state = criteriaInitialState, action) => {
  switch (action.type) {
    case SET_CRITERIA:
      const { criteriaData } = action.payload;
      return {
        ...state,
        criteria: formatCriteria(criteriaData, state.fields),
      };


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


    case RESET_CRITERIA:
      return criteriaInitialState;


    default:
      return state;
  }
};

export default combineReducers({
  criteria,
  sider,
  logic,
});
