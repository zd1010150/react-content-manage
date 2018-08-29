import Enums from 'utils/EnumsManager';

const { INVOICE } = Enums.ReduxActionTypePrefix;
const ATTACHMENTS = 'ATTACHMENTS';
export const ADD_ATTACHMENT = `${INVOICE}_${ATTACHMENTS}_ADD_ATTACHMENT`;
export const REMOVE_ATTACHMENT = `${INVOICE}_${ATTACHMENTS}_REMOVE_ATTACHMENT`;
export const SET_ATTACHMENTS = `${INVOICE}_${ATTACHMENTS}_SET_ATTACHMENTS`;
