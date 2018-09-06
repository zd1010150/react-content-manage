import Enums from 'utils/EnumsManager';
import { setStore, getStore } from 'utils/localStorage';
import { SET_DATA, SET_OPTIONS, SET_ROW_SELECTION, SET_VIEWS, SET_ACTIVE_VIEW, SET_PAGE_SIZE } from './actionTypes';

const { PhantomId, DefaultPageConfigs, LocalStorageKeys } = Enums;
const { PageSize } = DefaultPageConfigs;
const { Leads, Accounts, Opportunities } = LocalStorageKeys;

const parseViewId = type => (getStore(type) ? parseInt(getStore(type)) : PhantomId);

const initialState = {
  activeViewId: {
    leads: parseViewId(Leads),
    accounts: parseViewId(Accounts),
    opportunities: parseViewId(Opportunities),
  },
  columns: [],
  data: [],
  meta: {},
  selectedRowKeys: [],
  tableParams: {},
  selectedFieldOptions: [],
  views: [],
  PageSizeValue: PageSize,
};

const objectList = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      const {
        columns,
        data,
        meta,
        tableParams,
      } = action.payload;
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
        view_name: 'My View',
      };
      return {
        ...state,
        views: [viewAll, ...views],
      };


    case SET_ACTIVE_VIEW:
      const { viewId, objectType } = action.payload;
      setStore(`crm_${objectType}View`, viewId);
      return {
        ...state,
        activeViewId: {
          ...state.activeViewId,
          [objectType]: viewId,
        },
      };

    case SET_PAGE_SIZE:
      const { PageSizeValue } = action.payload;
      return {
        ...state,
        PageSizeValue,
      };

    default:
      return state;
  }
};

export default objectList;
