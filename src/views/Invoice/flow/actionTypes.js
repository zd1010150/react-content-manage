import Enums from 'utils/EnumsManager';

const { ReduxActionTypePrefix } = Enums;
const { INVOICE } = ReduxActionTypePrefix;

export const SET_ATTACHMENT = `${INVOICE}_SET_ATTACHMENT`;
export const REMOVE_ATTACHMENT = `${INVOICE}_REMOVE_ATTACHMENT`;
