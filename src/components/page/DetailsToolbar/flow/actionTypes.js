import Enums from 'utils/EnumsManager';

const { ReduxActionTypePrefix } = Enums;
const { OBJECTDETAILS } = ReduxActionTypePrefix;

const SET_TOOLS = `${OBJECTDETAILS}_SET_TOOLS`;
const DELETE_SUCCESS = `${OBJECTDETAILS}_DELETE_SUCCESS`;
const RESET = `${OBJECTDETAILS}_RESET`;

export {
  SET_TOOLS,
  DELETE_SUCCESS,
  RESET,
};
