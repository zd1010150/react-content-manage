import Item from '../../utils/itemsList';
import {
  ADD_NEW_ITEM,
  DELETE_ITEM,
  ACTIVATE_CELL,
  DEACTIVATE_CELL,
  SET_COLUMN_VALUE,
  DEACTIVATE_ROW,
} from './actionTypes';
import { RESET } from '../actionTypes';


const initialState = [];

const itemsList = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_ITEM:
      return [...state, new Item()];

    case DELETE_ITEM:
      return state.filter(r => r.id !== action.payload.id);

    case ACTIVATE_CELL:
      const activatedRecord = state.find(r => r.id === action.payload.id);
      activatedRecord.setProperty('editingCol', action.payload.column);
      return [...state];

    case DEACTIVATE_CELL:
      const deactivatedRecord = state.find(r => r.id === action.payload.id);
      deactivatedRecord.toValidValue();
      deactivatedRecord.setProperty('editingCol', '');
      return [...state];

    case DEACTIVATE_ROW:
      const focusingRecord = state.find(r => r.id === action.payload.id);
      focusingRecord.setProperty('isEditingAll', false);
      return [...state];

    case SET_COLUMN_VALUE:
      const modifyingRecord = state.find(r => r.id === action.payload.id);
      modifyingRecord.setProperty(action.payload.column, action.payload.newValue);
      return [...state];

    case RESET:
      return initialState;

    default:
      return state;
  }
};

export default itemsList;
