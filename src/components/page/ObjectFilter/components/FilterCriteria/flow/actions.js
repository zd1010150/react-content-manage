import {
  SET_FILTERS,
  SET_CONDITION_LOGIC,
  ADD_FILTER,
  REMOVE_FILTER,
  CHANGE_FILTER,
} from './actionTypes';

export const setFilters = data => ({
  type: SET_FILTERS,
  payload: { data },
});

export const setConditionLogic = condition_logic => ({
  type: SET_CONDITION_LOGIC,
  payload: { condition_logic },
});

export const addFilter = () => ({
  type: ADD_FILTER,
});

export const removeFilter = displayNum => ({
  type: REMOVE_FILTER,
  payload: { displayNum },
});

export const changeFilterByColumn = (displayNum, key, value, fieldId) => ({
  type: CHANGE_FILTER,
  payload: { displayNum, key, value, fieldId },
});
