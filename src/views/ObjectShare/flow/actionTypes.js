import Enums from 'utils/EnumsManager';

const { OBJECTSHARE } = Enums.ReduxActionTypePrefix;

export const UPDATE_SELECTION = `${OBJECTSHARE}_UPDATE_SELECTION`;
export const CHANGE_FROM_SELECTION = `${OBJECTSHARE}_CHANGE_FROM_SELECTION`;
export const REMOVE_FROM_SELECTION = `${OBJECTSHARE}_REMOVE_FROM_SELECTION`;
export const SET_ACTIVE_TEAM = `${OBJECTSHARE}_SET_ACTIVE_TEAM`;
export const SET_SHARE_TO = `${OBJECTSHARE}_SET_SHARE_TO`;