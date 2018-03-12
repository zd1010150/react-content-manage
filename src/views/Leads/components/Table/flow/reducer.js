import { combineReducers } from 'redux';
import { SET_TABLE_DATA } from './actionTypes';
import Enums from 'utils/EnumsManager';

const initialState = {
  columns: [],
  data: [],
  pagination: {},
  sorter: {
    orderBy: '',
    sortedBy: '',
  },
};

const table = (state = initialState, action) => {
  switch (action.type) {
    case SET_TABLE_DATA:
      const { json, sorter } = action.payload;
      const { index, selector_meta } = json;
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
        sorter,
      };
      
    default:
      return state;
  }
};

export default table;