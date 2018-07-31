import Item from '../../utils/itemsList';
import {
  ADD_NEW_ITEM,
} from './actionTypes';

const initialState = {
  data: [],
};

const itemsList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ITEM:
      const newItem = new Item();
      debugger;
      return {
        ...state,
        data: [...state.data, newItem],
      };


    default:
      return state;
  }
};

export default itemsList;
