import Enums from 'utils/EnumsManager';

const { ReduxActionTypePrefix } = Enums;
const { INVOICE } = ReduxActionTypePrefix;

export const SET_ATTACHMENT = `${INVOICE}_SET_ATTACHMENT`;
export const REMOVE_ATTACHMENT = `${INVOICE}_REMOVE_ATTACHMENT`;
// CI
export const SET_CI_FIELD = `${INVOICE}_SET_CI_FIELD`;
// BI
export const SET_BI_FIELD = `${INVOICE}_SET_BI_FIELD`;
// Invoice Info
export const SET_INVOICE_FIELD = `${INVOICE}_SET_INVOICE_FIELD`;
// Item Info
export const SET_ITEM_INFO_FIELD = `${INVOICE}_SET_ITEM_INFO_FIELD`;
export const SET_ACTIVE_RECORD = `${INVOICE}_SET_ACTIVE_RECORD`;
export const UPDATE_ACTIVE_RECORD = `${INVOICE}_UPDATE_ACTIVE_RECORD`;
export const ADD_NEW_ROW = `${INVOICE}_ADD_NEW_ROW`;
