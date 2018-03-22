import Enums from 'utils/EnumsManager';
import { RESET_VIEW_GLOBAL, SET_TEAMS_GLOBAL } from 'store/global/actionType';

export const RESET_VIEW = RESET_VIEW_GLOBAL;
export const SET_TEAMS = SET_TEAMS_GLOBAL;

const { VIEWFILTER } = Enums.ReduxActionTypePrefix;
export const SET_VISIBILITY_OPTION = VIEWFILTER + 'SET_VISIBILITY_OPTION';
export const SELECT_TEAM = VIEWFILTER + 'SELECT_TEAM';
export const SET_USERS = VIEWFILTER + 'SET_USERS';
export const ADD_ENTITY_TO_SELECTION = VIEWFILTER + 'ADD_ENTITY_TO_SELECTION';
