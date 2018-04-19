import { get, post, httpDelete } from 'store/http/httpAction';
import {
  SET_DATA,
  SET_ROW_SELECTION,
  SET_OPTIONS,
  SET_VIEWS,
  SET_ACTIVE_VIEW,
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

const setData = (columns, data, meta, tableParams) => ({
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


//
export const setOptions = selectedFieldOptions => ({
      type: SET_OPTIONS,
      payload: { selectedFieldOptions },
    });

export const tryFetchOptionsById = id => dispatch =>
    get(`/admin/objects/lookup-metadata/${id}`, {}, dispatch).then((data) => {
      if (!_.isEmpty(data)) {
        dispatch(setOptions(data));
      }
    });


//
export const tryUpdateClients = (params, objectType, tableParams) => dispatch =>
    post(`/admin/${objectType}/mass-update`, params, dispatch).then((data) => {      
      if (data && !_.isEmpty(data.updated_ids)) {
        dispatch(tryFetchData(objectType, tableParams));
      }
    });


//
export const setViews = views => ({
      type: SET_VIEWS,
      payload: { views },
    });

export const tryFetchViewsByType = objectType => dispatch =>
    get(`/admin/list_views/object/${objectType}`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        dispatch(setViews(data.data));
      }
    });


//
export const setActiveView = activeViewId => ({
      type: SET_ACTIVE_VIEW,
      payload: { activeViewId },
    });