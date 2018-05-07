/* eslint-disable no-case-declarations */
import { SET_EMAIL, SET_SUCCESS, RESET, SET_TYPES } from './actionTypes';

const initialState = {
  email: '',
  success: false,
  newAccountId: '',
  types: [],
};

const conversion = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };


    case SET_SUCCESS:
      const { newAccountId } = action.payload;
      return {
        ...state,
        success: true,
        newAccountId,
      };


    case SET_TYPES:
      const { types } = action.payload;
      return {
        ...state,
        types,
      };


    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default conversion;
