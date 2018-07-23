import { combineReducers } from 'redux';

/**
 * Condition Logic Reducer
 */
const conditionLogic = (state = 'default logic', action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/**
 * Filter Criteria Reducer
 */
const initialState = {
  filters: [{ type: 'date' }],
};

const criteria = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  criteria,
  conditionLogic,
});
