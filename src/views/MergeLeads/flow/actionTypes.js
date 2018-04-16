import Enums from 'utils/EnumsManager';
const { MERGE } = Enums.ReduxActionTypePrefix;
export const SET_DATA = MERGE + 'SET_DATA';
export const SET_MERGED_DATA = MERGE + 'SET_MERGED_DATA';
export const SET_MASTER_RECORD = MERGE + 'SET_MASTER_RECORD';
