import Enums from 'utils/EnumsManager';

const { CRITERIA } = Enums.ReduxActionTypePrefix;
// export const SET_FILTERS = VIEWFILTER + 'SET_FILTERS';
// export const SET_CONDITION_LOGIC = VIEWFILTER + 'SET_CONDITION_LOGIC';
// export const ADD_FILTER = VIEWFILTER + 'ADD_FILTER';
// export const REMOVE_FILTER = VIEWFILTER + 'REMOVE_FILTER';
// export const CHANGE_FILTER = VIEWFILTER + 'CHANGE_FILTER';
// export const SET_SIDER_OPTIONS = VIEWFILTER + 'SET_SIDER_OPTIONS';
// export const SET_SIDER_SELECTION = VIEWFILTER + 'SET_SIDER_SELECTION';
// export const SYNC_SIDER_SELECTION = VIEWFILTER + 'SYNC_SIDER_SELECTION';
// export const INSERT_SIDER_SELECTION = VIEWFILTER + 'INSERT_SIDER_SELECTION';
// export const SET_TIME_RANGE_VALUE = `${OBJECTVIEW}_SET_TIME_RANGE_VALUE`;

export const SET_CRITERIA = `${CRITERIA}_SET_CRITERIA`;
export const SET_FIELDS = `${CRITERIA}_SET_FIELDS`;
export const ADD_CRITERION = `${CRITERIA}_ADD_CRITERION`;
export const SET_CRITERION = `${CRITERIA}_SET_CRITERION`;
export const REMOVE_CRITERION = `${CRITERIA}_REMOVE_CRITERION`;
export const SET_SIDER_RECORD = `${CRITERIA}_SET_SIDER_RECORD`;
export const SET_FIELD_OPTIONS = `${CRITERIA}_SET_FIELD_OPTIONS`;
export const SET_LOGIC = `${CRITERIA}_SET_LOGIC`;
export const RESET_CRITERIA = `${CRITERIA}_RESET_CRITERIA`;