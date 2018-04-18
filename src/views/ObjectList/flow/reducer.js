import {
  SET_DATA,
  SET_ROW_SELECTION,
  SET_OPTIONS,
} from './actionTypes';

const initialState = {
  columns: [],
  data: [],
  meta: {},
  selectedRowKeys: [],
  tableParams: {},
  selectedFieldOptions: [],
};

const objectList = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      const { columns, data, meta, tableParams } = action.payload;
      return {
        ...state,
        columns,
        data,
        meta,
        selectedRowKeys: [],
        tableParams,
      };

    
    case SET_ROW_SELECTION:
      const { selectedRowKeys } = action.payload;
      return {
        ...state,
        selectedRowKeys,
      };


    case SET_OPTIONS:
      const { selectedFieldOptions } = action.payload;
      return {
        ...state,
        selectedFieldOptions,
      };


    default:
      return state;
  }
};

export default objectList;