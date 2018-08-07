import Enums from 'utils/EnumsManager';

const { INVOICE } = Enums.ReduxActionTypePrefix;

export const RESET = `${INVOICE}_RESET`;
// CI
export const SET_CI_FORM = `${INVOICE}_SET_CI_FORM`;
export const SET_CI_FIELD = `${INVOICE}_SET_CI_FIELD`;
// BI
export const SET_BI_FIELD = `${INVOICE}_SET_BI_FIELD`;
