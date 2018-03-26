import { 
  SET_CONDITION_LOGIC,
  ADD_FILTER,
  REMOVE_FILTER,
  CHANGE_FIELD,
} from './actionTypes';

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

export const changeField = (fieldId, displayNum, fieldType) => ({
  type: CHANGE_FIELD,
  payload: { fieldId, displayNum, fieldType },
});