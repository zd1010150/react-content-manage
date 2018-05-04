/* eslint-disable no-case-declarations */
import { SET_EMAIL, SET_SUCCESS, RESET } from './actionTypes';

const initialState = {
  email: '',
  success: false,
  newAccountId: '',
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


    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default conversion;
