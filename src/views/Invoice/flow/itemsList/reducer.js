import Item from '../../utils/itemsList';
import {
  ADD_NEW_ITEM,
  DELETE_ITEM,
  ACTIVATE_CELL,
  DEACTIVATE_CELL,
  SET_COLUMN_VALUE,
} from './actionTypes';
import { RESET } from '../actionTypes';

const initialState = {
  data: [],
};

const itemsList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return {
        ...state,
        data: [...state.data, new Item()],
      };

    case DELETE_ITEM:
      return {
        ...state,
        data: state.data.filter(r => r.id !== action.payload.id),
      };

    case ACTIVATE_CELL:
      const activatedRecord = state.data.find(r => r.id === action.payload.id);
      activatedRecord.setProperty('editingCol', action.payload.column);
      return {
        ...state,
        data: [...state.data],
      };

    case DEACTIVATE_CELL:
      const deactivatedRecord = state.data.find(r => r.id === action.payload.id);
      deactivatedRecord.setProperty('editingCol', '');
      return {
        ...state,
        data: [...state.data],
      };

    case SET_COLUMN_VALUE:
      const modifyingRecord = state.data.find(r => r.id === action.payload.id);
      modifyingRecord.setProperty(action.payload.column, action.payload.newValue);
      return {
        ...state,
        data: [...state.data],
      };

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default itemsList;
