import { SET_VISIBILITY_OPTION } from './actionTypes';

export const setVisibilityOption = selectedOption => ({  
  type: SET_VISIBILITY_OPTION,
  payload: { selectedOption },
});