import Enums from 'utils/EnumsManager';

const { ReduxActionTypePrefix } = Enums;
const { CONVERSION } = ReduxActionTypePrefix;

export const SET_ACCOUNT_ID = `${CONVERSION}_SET_ACCOUNT_ID`;
export const RESET = `${CONVERSION}_RESET`;
