/* eslint-disable no-param-reassign */
import {
  SET_ITEM_INFO_FIELD,
  SET_ACTIVE_RECORD,
  UPDATE_ACTIVE_RECORD,
  ADD_NEW_ROW,
} from './actionTypes';

const initialState = {
  idStatus: {
    value: '',
  },
  idRelateTo: {
    value: '',
  },
  idLastModifiedDate: {
    value: '',
  },
  idModefiedBy: {
    value: '',
  },
  idDescription: {
    value: '',
  },
  items: [{
    id: 1,
    itemDescription: 'test description',
    itemCode: 'sku888',
    quantity: 1,
    unitPrice: 100,
  }, {
    id: 2,
    itemDescription: 'test description-2',
    itemCode: 'sku888-2',
    quantity: 2,
    unitPrice: 50,
  }],
};

const itemDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_INFO_FIELD:
      const { field } = action.payload;
      return {
        ...state,
        ...field,
      };

    case SET_ACTIVE_RECORD:
      const { id, colName } = action.payload;
      state.items.forEach((record) => {
        if (record.id === id) {
          record.active = true;
          record.activeCol = colName;
        } else {
          delete record.active;
          delete record.activeCol;
        }
      });
      return {
        ...state,
        items: [...state.items],
      };

    case UPDATE_ACTIVE_RECORD:
      const { recordId, newVal, recordCol } = action.payload;
      state.items.forEach((record) => {
        if (record.id === recordId) {
          record[recordCol] = newVal;
          delete record.active;
          delete record.activeCol;
        }
      });
      return {
        ...state,
        items: [...state.items],
      };

    case ADD_NEW_ROW:
      const newItem = {
        // TODO: need to discuss with BE about what should be pass to for new record
        id: `0000-0000-${state.items.length}`,
        itemDescription: '',
        itemCode: '',
        quantity: 0,
        unitPrice: 0,
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };

    default:
      return state;
  }
};

export default itemDetails;
