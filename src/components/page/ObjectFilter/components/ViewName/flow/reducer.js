import { SET_VIEW_NAME } from './actionTypes';

const initialState = {
  view_name: '',
};

const viewName = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEW_NAME:
      const { view_name } = action.payload;
      return {
        ...state,
        view_name,
      };
      
    default:
      return state;
  }
};

export default viewName;