import { combineReducers } from 'redux';

/**
 * Condition Logic Reducer
 */
const conditionLogic = (state = '', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/**
 * Filter Criteria Reducer
 */
const initialState = {
};

const filterCriteria = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  filterCriteria,
  conditionLogic,
});
