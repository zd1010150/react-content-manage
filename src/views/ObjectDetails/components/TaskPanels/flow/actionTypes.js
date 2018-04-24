import Enums from 'utils/EnumsManager';
import { RESET } from '../../../flow/actionTypes';

const { VIEWDETAILS } = Enums.ReduxActionTypePrefix;

const SET_MODULE_DATA = `${VIEWDETAILS}SET_MODULE_DATA`;
const SET_MODULES = `${VIEWDETAILS}SET_MODULES`;

export {
  RESET,
  SET_MODULE_DATA,
  SET_MODULES,
};
