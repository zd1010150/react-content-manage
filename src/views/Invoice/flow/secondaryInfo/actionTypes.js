import Enums from 'utils/EnumsManager';

const { INVOICE } = Enums.ReduxActionTypePrefix;
const SECONDARYINFO = 'SECONDARYINFO';
export const SET_RELATED_TOS = `${INVOICE}_${SECONDARYINFO}_SET_RELATED_TOS`;
export const SET_RELATED_TO = `${INVOICE}_${SECONDARYINFO}_SET_RELATED_TO`;
export const SET_STATUS = `${INVOICE}_${SECONDARYINFO}_SET_STATUS`;
export const SET_DESCRIPTION = `${INVOICE}_${SECONDARYINFO}_SET_DESCRIPTION`;
export const SET_INFO = `${INVOICE}_${SECONDARYINFO}_SET_INFO`;
