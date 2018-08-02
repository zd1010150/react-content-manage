import Item from '../../utils/itemsList';
import {
  ADD_NEW_ITEM,
} from './actionTypes';
import { RESET } from '../actionTypes';


const initialState = [];

const summary = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return [...state, new Item()];

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default summary;
