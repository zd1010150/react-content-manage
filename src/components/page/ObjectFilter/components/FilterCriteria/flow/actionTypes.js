import Enums from 'utils/EnumsManager';
import { RESET_VIEW_GLOBAL } from 'store/global/actionType';
export const RESET_VIEW = RESET_VIEW_GLOBAL;

const { VIEWFILTER } = Enums.ReduxActionTypePrefix;
export const SET_CONDITION_LOGIC = VIEWFILTER + 'SET_CONDITION_LOGIC';
export const ADD_FILTER = VIEWFILTER + 'ADD_FILTER';
export const REMOVE_FILTER = VIEWFILTER + 'REMOVE_FILTER';
export const CHANGE_FIELD = VIEWFILTER + 'CHANGE_FIELD';