import { SET_VIEW_NAME } from './actionTypes';

export const setViewName = view_name => ({  
  type: SET_VIEW_NAME,
  payload: { view_name },
});