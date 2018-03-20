import { SET_CONDITION_LOGIC, ADD_FILTER, RESET_VIEW } from './actionTypes';

export const setConditionLogic = condition_logic => ({
  type: SET_CONDITION_LOGIC,
  payload: { condition_logic },
});

export const addFilter = () => ({
  type: ADD_FILTER,
});