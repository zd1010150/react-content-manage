import Enums from 'utils/EnumsManager';

const { VIEWDETAILS } = Enums.ReduxActionTypePrefix;
export const SET_DATA_SOURCE = VIEWDETAILS + 'SET_DATA_SOURCE';
export const SET_ACTIVE_FIELD = VIEWDETAILS + 'SET_ACTIVE_FIELD';
export const RESET_ACTIVE_FIELD = VIEWDETAILS + 'RESET_ACTIVE_FIELD';
export const SET_FIELD_VALUE = VIEWDETAILS + 'SET_FIELD_VALUE';
export const RESET_FIELD_VALUE = VIEWDETAILS + 'RESET_FIELD_VALUE';
export const REVERT_ALL_FIELDS = VIEWDETAILS + 'REVERT_ALL_FIELDS';

export const RESET = VIEWDETAILS + 'RESET';
