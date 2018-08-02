import Enums from 'utils/EnumsManager';

const { INVOICE } = Enums.ReduxActionTypePrefix;
export const ADD_NEW_ITEM = `${INVOICE}_ADD_NEW_ITEM`;
export const ACTIVATE_CELL = `${INVOICE}_ACTIVATE_CELL`;
export const DEACTIVATE_CELL = `${INVOICE}_DEACTIVATE_CELL`;
export const DELETE_ITEM = `${INVOICE}_DELETE_ITEM`;
export const SET_COLUMN_VALUE = `${INVOICE}_SET_COLUMN_VALUE`;
export const DEACTIVATE_ROW = `${INVOICE}_DEACTIVATE_ROW`;
