import Enums from 'utils/EnumsManager';
import { RESET_VIEW_GLOBAL } from 'store/global/actionType';
export const RESET_VIEW = RESET_VIEW_GLOBAL;

const { VIEWFILTER } = Enums.ReduxActionTypePrefix;
export const SET_AVAILABLE_FIELDS = VIEWFILTER + 'SET_AVAILABLE_FIELDS';
export const SET_NEW_ORDER = VIEWFILTER + 'SET_NEW_ORDER';
export const ADD_TO_SELECTION = VIEWFILTER + 'ADD_TO_SELECTION';
export const REMOVE_FROM_SELECTION = VIEWFILTER + 'REMOVE_FROM_SELECTION';