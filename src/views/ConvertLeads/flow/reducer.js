import { SET_EMAIL, SET_SUCCESS } from './actionTypes';

const initialState = {
  email: '',
  success: false,
};

const conversion = (state = initialState, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload.email,
      };


    case SET_SUCCESS:
      return {
        ...state,
        success: true,
      };


    default:
      return state;
  }
};

export default conversion;
