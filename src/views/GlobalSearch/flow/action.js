import { get } from 'store/http/httpAction';
import _ from 'lodash';
import { GLOBAL_SEARCH_SET_RESULTS, GLOBAL_SEARCH_SET_SEARCHKEY, GLOABL_SEARCH_SET_PAGENATION, GLOBAL_SEARCH_SET_RESULTS_COLUMN_META } from './actionType';
import { OBJECT_TYPES } from 'config/app.config';

const { leads, accounts, opportunities } = OBJECT_TYPES;

export const setSearchResult = (objType, result) => ({
  type: GLOBAL_SEARCH_SET_RESULTS,
  objType,
  result,
});

export const setSearchKey = keys => ({
  type: GLOBAL_SEARCH_SET_SEARCHKEY,
  keys,
});
export const setPagenation = (objType, perPage, currentPage, total) => ({
  type: GLOABL_SEARCH_SET_PAGENATION,
  objType,
  perPage,
  currentPage,
  total,
});

export const setColumnMeta = (objType, meta) => ({
  type: GLOBAL_SEARCH_SET_RESULTS_COLUMN_META,
  objType,
  meta,
});

const setData = (objType, data, dispatch) => {
  if (!_.isEmpty(data)) {
    dispatch(setSearchResult(objType, data.index.data));
    const { total, per_page, current_page } = data.index.meta.pagination;
    dispatch(setPagenation(objType, per_page, current_page, total));
    dispatch(setColumnMeta(objType, data.selector_meta.data));
  }
};

export const fetchResultFromRemote = search => dispatch => get('/admin/objects/search', { search }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    setData(leads, data[leads], dispatch);
    setData(accounts, data[accounts], dispatch);
    setData(opportunities, data[opportunities], dispatch);
  }
});


export const fetchResultByObjtype = (objType, search, per_page, page) => dispatch => get(`/admin/objects/search/object_type/${objType}`, { search, per_page, page }, dispatch).then((data) => {
  setData(objType, data, dispatch);
});
