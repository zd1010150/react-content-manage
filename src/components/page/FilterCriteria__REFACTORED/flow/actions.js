import {
  SET_FIELDS,
  ADD_CRITERION,
  SET_CRITERION,
  REMOVE_CRITERION,
} from './actionTypes';

export const addCriterion = () => ({
  type: ADD_CRITERION,
});

export const setFields = fields => ({
  type: SET_FIELDS,
  payload: { fields },
});

export const setCriterionByColumn = (column, displayNum, newValue, newSubtype) => ({
  type: SET_CRITERION,
  payload: { column, displayNum, newValue, newSubtype },
});

export const removeCriterionByDisplayNum = removedDisplayNum => ({
  type: REMOVE_CRITERION,
  payload: { removedDisplayNum },
});
