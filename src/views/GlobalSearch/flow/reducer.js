import { combineReducers } from 'redux';
import { GLOBAL_SEARCH_SET_RESULTS, GLOBAL_SEARCH_SET_SEARCHKEY, GLOABL_SEARCH_SET_PAGENATION, GLOBAL_SEARCH_SET_RESULTS_COLUMN_META } from './actionType';
import { OBJECT_TYPES } from 'config/app.config';

const { leads, accounts, opportunities } = OBJECT_TYPES;
const globalSearchResult = (state = { [leads]: [], [accounts]: [], [opportunities]: [] }, action) => {
  const { type, objType, result } = action;
  switch (type) {
    case GLOBAL_SEARCH_SET_RESULTS:
      return Object.assign({}, state, { [objType]: result });
    default:
      return state;
  }
};
const globalSearchColumnsMeta = (state = { [leads]: [], [accounts]: [], [opportunities]: [] }, action) => {
  const { type, objType, meta } = action;
  switch (type) {
    case GLOBAL_SEARCH_SET_RESULTS_COLUMN_META:
      return Object.assign({}, state, { [objType]: meta });
    default:
      return state;
  }
};

const globalSearchKey = (state = '', action) => {
  const { type, keys } = action;
  switch (type) {
    case GLOBAL_SEARCH_SET_SEARCHKEY:
      return keys;
    default:
      return state;
  }
};

const paginations = (state = {
  [leads]: {
    perPage: 10, currentPage: 1, total: 0,
  },
  [accounts]: {
    perPage: 10, currentPage: 1, total: 0,
  },
  [opportunities]: {
    perPage: 10, currentPage: 1, total: 0,
  },
}, action) => {
  const { type, objType, ...payload } = action;
  switch (type) {
    case GLOABL_SEARCH_SET_PAGENATION:
      return Object.assign({}, state, {
        [objType]: {
          ...payload,
        },
      });
    default:
      return state;
  }
};


export default combineReducers({
  globalSearchResult, globalSearchKey, paginations, globalSearchColumnsMeta,
});

