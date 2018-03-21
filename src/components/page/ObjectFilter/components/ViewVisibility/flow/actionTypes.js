import Enums from 'utils/EnumsManager';
import { RESET_VIEW_GLOBAL } from 'store/global/actionType';
export const RESET_VIEW = RESET_VIEW_GLOBAL;

const { VIEWFILTER } = Enums.ReduxActionTypePrefix;
export const SET_VISIBILITY_OPTION = VIEWFILTER + 'SET_VISIBILITY_OPTION';