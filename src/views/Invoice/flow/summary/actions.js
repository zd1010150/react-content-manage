import {
  ACTIVATE_ROW,
  DEACTIVATE_ROW,
  SET_ROW_VALUE,
} from './actionTypes';

export const activatedRowByKey = key => ({
  type: ACTIVATE_ROW,
  payload: { key },
});

export const deactivatedRowByKey = key => ({
  type: DEACTIVATE_ROW,
  payload: { key },
});

export const setRowValueByKey = (rowKey, key, value) => ({
  type: SET_ROW_VALUE,
  payload: { rowKey, key, value },
});
