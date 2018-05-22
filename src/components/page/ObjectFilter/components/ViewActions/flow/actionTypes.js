import { RESET_VIEW_GLOBAL } from 'store/global/actionType';
import Enums from 'utils/EnumsManager';

const { ReduxActionTypePrefix } = Enums;
const { VIEWFILTER } = ReduxActionTypePrefix;

export const RESET_VIEW = RESET_VIEW_GLOBAL;
export const DONE = `${VIEWFILTER}_DONE`;
