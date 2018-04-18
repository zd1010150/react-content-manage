import {
  SET_DATA,
  SET_ROW_SELECTION,
  DELETE_CLIENT,
} from './actionTypes';

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
    
    
    case DELETE_CLIENT:
      const { deleteId } = action.payload;
      const dataAfterDelete = state.data.filter(record => record.id !== deleteId);
      return {
        ...state,
        data: dataAfterDelete,
      };


    default:
      return state;
  }
};

export default objectList;