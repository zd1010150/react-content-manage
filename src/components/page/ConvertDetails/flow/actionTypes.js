import Enums from 'utils/EnumsManager';

const { ReduxActionTypePrefix } = Enums;
const { CONVERSION } = ReduxActionTypePrefix;

export const SET_DETAILS = `${CONVERSION}_SET_DETAILS`;
export const SET_SIMILAR_DATA = `${CONVERSION}_SET_SIMILAR_DATA`;
export const RESET = `${CONVERSION}_RESET`;
