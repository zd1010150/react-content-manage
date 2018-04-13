import { RESET_VIEW_GLOBAL } from 'store/global/actionType';
import Enums from 'utils/EnumsManager';

export const RESET_VIEW = RESET_VIEW_GLOBAL;

const { VIEWFILTER } = Enums.ReduxActionTypePrefix;
export const SAVE_SUCCESS = VIEWFILTER + 'SAVE_SUCCESS';
export const SAVE_FAILED = VIEWFILTER + 'SAVE_FAILED';