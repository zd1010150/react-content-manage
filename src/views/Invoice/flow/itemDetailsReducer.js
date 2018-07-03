/* eslint-disable no-param-reassign */
import {
  SET_ITEM_INFO_FIELD,
  SET_ACTIVE_RECORD,
  UPDATE_ACTIVE_RECORD,
  SET_ITEM_DETAILS,
  ADD_NEW_ROW,
} from './actionTypes';
import { mapToItemInfoForm, mapToItems, getSubTotal, mapToSummary } from './utils';

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
  summary: [{
    id: 1,
    description: 'rowTotal',
    additionVal: '10',
    additionOp: '+',
    total: '1000',
  }, {
    id: 2,
    description: 'tax',
    additionVal: '5',
    additionOp: '+ %',
    total: '10',
  }, {
    id: 3,
    description: 'grandTotal',
    additionVal: '',
    additionOp: '',
    total: '1010',
  }],
};

const itemDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEM_DETAILS:
      const { data } = action.payload;
      const items = mapToItems(data);
      const subTotal = getSubTotal(items);
      console.log(`Sum is ${subTotal}`);
      const summary = mapToSummary(data, subTotal);
      const itemInfo = mapToItemInfoForm(data);
      return {
        ...state,
        items,
        summary,
        ...itemInfo,
      };

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
