import { combineReducers } from 'redux';
import { SET_TABLE_DATA, DELETE_SUCCESS } from './actionTypes';
import Enums from 'utils/EnumsManager';

const initialState = {
  columns: [],
  data: [],
  pagination: {},
};

const table = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_DATA:
      const { index, selector_meta } = action.payload;
      const { data, meta } = index;
      const { pagination } = meta;
      const pageInfo = {
        current: pagination.current_page,
        pageSize: pagination.per_page,
        total: pagination.total,
      };
      const columns = selector_meta.data;
      return {
        columns,
        data,
        pagination: pageInfo,
      };
    case DELETE_SUCCESS:
      const { id } = action.payload;
      const dataCopy = state.data;
      const deletedData = dataCopy.filter(record => record.id != id);
      return {
        ...state,
        data: deletedData,
      };
    default:
      return state;
  }
};

export default table;