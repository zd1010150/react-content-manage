import { SET_DATA, SET_ROW_SELECTION } from './actionTypes';

const initialState = {
  columns: [],
  data: [],
  meta: {},
  selectedRowKeys: [], 
};

const objectList = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      const { columns, data, meta } = action.payload;
      return {
        ...state,
        columns,
        data,
        meta,
        selectedRowKeys: [],
      };

    
    case SET_ROW_SELECTION:
      const { selectedRowKeys } = action.payload;
      return {
        ...state,
        selectedRowKeys,
      };


    default:
      return state;
  }
};

export default objectList;