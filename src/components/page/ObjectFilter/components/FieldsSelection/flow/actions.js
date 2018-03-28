import {
  ADD_TO_SELECTION,
  REMOVE_FROM_SELECTION,
  SET_NEW_ORDER,
  SET_AVAILABLE_FIELDS,
} from './actionTypes';

export const addToSelection = addedFields => ({
  type: ADD_TO_SELECTION,
  payload: { addedFields },
});

export const removeFromSelection = removedFields => ({
  type: REMOVE_FROM_SELECTION,
  payload: { removedFields },
});

export const setNewOrder = sortedArray => ({
  type: SET_NEW_ORDER,
  payload: { sortedArray },
});

export const setAvailableFields = data => ({
  type: SET_AVAILABLE_FIELDS,
  payload: { data },
});
