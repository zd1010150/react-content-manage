import Enums from 'utils/EnumsManager';

const { INVOICE } = Enums.ReduxActionTypePrefix;
const SUMMARY = 'SUMMARY';
export const ACTIVATE_ROW = `${INVOICE}_${SUMMARY}_ACTIVATE_ROW`;
export const DEACTIVATE_ROW = `${INVOICE}_${SUMMARY}_DEACTIVATE_ROW`;
export const SET_ROW_VALUE = `${INVOICE}_${SUMMARY}_SET_ROW_VALUE`;
