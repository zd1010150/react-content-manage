import { combineReducers } from 'redux';
import { SET_VIEWS, SET_ACTIVE_ID } from './actionTypes';
import EnumsManager from 'utils/EnumsManager';

const initialState = {
  activeId: EnumsManager.PhantomID,
  options: [],
};
const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIEWS:
      const { data } = action.payload;
      // test
      const options = [
        {
          id: 1,
          view_name: 'test1'
        },
        {
          id: 2,
          view_name: 'test2'
        },
        {
          id: 3,
          view_name: 'test3'
        },
      ];
      // ends
      return {
        ...state,
        options,
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