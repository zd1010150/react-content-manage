import { combineReducers } from 'redux';
import { SET_VIEWS, SET_ACTIVE_ID } from './actionTypes';
import Enums from 'utils/EnumsManager';

const viewAll = {
  id: Enums.PhantomID,
  view_name: "All",
};

const initialState = {
  activeId: Enums.PhantomID,
  options: [viewAll],
};
const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWS:
      const { data } = action.payload;
      data.unshift(viewAll);
      return {
        ...state,
        options: data,
      };

    case SET_ACTIVE_ID:
      const { id } = action.payload;
      return {
        ...state,
        activeId: id,
      };
    default:
      return state;
  }
};

export default filter;