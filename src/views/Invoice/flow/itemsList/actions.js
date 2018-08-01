import {
  ADD_NEW_ITEM,
  DELETE_ITEM,
  ACTIVATE_CELL,
  DEACTIVATE_CELL,
  SET_COLUMN_VALUE,
} from './actionTypes';

export const addNewItem = () => ({
  type: ADD_NEW_ITEM,
});

export const activateCell = (id, column) => ({
  type: ACTIVATE_CELL,
  payload: { id, column },
});

export const deactivateCell = (id, column) => ({
  type: DEACTIVATE_CELL,
  payload: { id, column },
});

export const deleteItemById = id => ({
  type: DELETE_ITEM,
  payload: { id },
});

export const setColumnValue = (id, column, newValue) => ({
  type: SET_COLUMN_VALUE,
  payload: { id, column, newValue },
});
