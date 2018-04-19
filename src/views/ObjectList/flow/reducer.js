import Enums from 'utils/EnumsManager';
import { SET_DATA, SET_OPTIONS, SET_ROW_SELECTION, SET_VIEWS, SET_ACTIVE_VIEW } from './actionTypes';
const { PhantomId } = Enums;

const initialState = {
  activeViewId: PhantomId,
  columns: [],
  data: [],
  meta: {},
  selectedRowKeys: [],
  tableParams: {},
  selectedFieldOptions: [],
  views: [],
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


    case SET_VIEWS:
      const { views } = action.payload;
      const viewAll = {
        id: PhantomId,
        view_name: 'All',
      };
      return {
        ...state,
        activeViewId: PhantomId,
        views: [ viewAll, ...views ],
      };


    case SET_ACTIVE_VIEW:
      const { activeViewId } = action.payload;
      return {
        ...state,
        activeViewId,
      };


    default:
      return state;
  }
};

export default objectList;