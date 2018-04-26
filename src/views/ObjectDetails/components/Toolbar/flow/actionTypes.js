import Enums from 'utils/EnumsManager';
import { RESET } from '../../../flow/actionTypes';

const { VIEWDETAILS } = Enums.ReduxActionTypePrefix;
const SET_TOOLS = `${VIEWDETAILS}SET_TOOLS`;
const DELETE_SUCCESS = `${VIEWDETAILS}DELETE_SUCCESS`;

export {
  RESET,
  SET_TOOLS,
  DELETE_SUCCESS,
};
