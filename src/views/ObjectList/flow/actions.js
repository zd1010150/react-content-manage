import { get, patch, httpDelete } from 'store/http/httpAction';
import {
  SET_DATA,
  SET_ROW_SELECTION,
} from './actionTypes';

const concatParams = params => {
  if (_.isEmpty(params)) return '';

  let str = '?';
  _.forOwn(params, (value, key) => {
    str += `${key}=${value}&`;
  });
  return str;
};
const getFetchPage = (params, meta, count) => {
  if (_.isNumber(meta.pagination.total)) {
    const { page, per_page } = params;
    const { total } = meta.pagination;
    if (count === total - (page - 1) * per_page) {
      return page - 1;
    }
    return page;
  }
  return 1;
};

export const setData = (columns, data, meta, tableParams) => ({
      type: SET_DATA,
      payload: { columns, data, meta, tableParams },
    });

export const tryFetchData = (objectType, params) => dispatch =>
    get(`/admin/${objectType}${concatParams(params)}`, {}, dispatch).then((data) => {
      if (data
          && !_.isEmpty(data.index)
          && data.index.data
          && data.index.meta
          && !_.isEmpty(data.selector_meta)
          && data.selector_meta.data) {
        dispatch(setData(data.selector_meta.data, data.index.data, data.index.meta, params));
      }
    });
    

//
export const setRowSelection = selectedRowKeys => ({
      type: SET_ROW_SELECTION,
      payload: { selectedRowKeys },
    });


//
export const tryDeleteClientByType = (objectType, id, params, meta) => dispatch =>
    httpDelete(`/admin/${objectType}/${id}`, {}, dispatch).then((data) => {
      if (data && data.deleted) {
        dispatch(tryFetchData(objectType, {
          ...params,
          page: getFetchPage(params, meta, 1),
        }));
      }
    });


//
export const tryDeleteClientsByType = (objectType, ids, params, meta) => dispatch =>
    httpDelete(`/admin/${objectType}/mass-delete`, { ids }, dispatch).then((data) => {
      if (data && !_.isEmpty(data.deleted_ids)) {
        dispatch(tryFetchData(objectType, {
          ...params,
          page: getFetchPage(params, meta, ids.length),
        }));
      }
    });