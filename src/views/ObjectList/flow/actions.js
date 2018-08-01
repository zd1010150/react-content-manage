import { get, httpDelete, patch } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { SET_ACTIVE_VIEW, SET_DATA, SET_OPTIONS, SET_ROW_SELECTION, SET_VIEWS } from './actionTypes';

const { PhantomId } = Enums;

const concatParams = (params) => {
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
const getFetchUrlByView = (objectType, id, params) => {
  if (id === PhantomId) {
    return `/admin/${objectType}${concatParams(params)}`;
  }
  return `/admin/${objectType}/by_list_view/${id}${concatParams(params)}`;
};


//
const setData = (columns, data, meta, tableParams) => ({
  type: SET_DATA,
  payload: {
    columns,
    data,
    meta,
    tableParams,
  },
});

export const tryFetchDataByView = (objectType, viewId, params) => dispatch =>
  get(getFetchUrlByView(objectType, viewId, params), {}, dispatch).then((data) => {
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
export const tryDeleteClientByType = (objectType, id, params, meta, activeViewId) => dispatch =>
  httpDelete(`/admin/${objectType}/${id}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      dispatch(tryFetchDataByView(
        objectType,
        activeViewId,
        {
          ...params,
          page: getFetchPage(params, meta, 1),
        },
      ));
    }
  });


// Mass Delete
export const tryDeleteClientsByType = (objectType, ids, params, meta, viewId) => dispatch =>
  httpDelete(`/admin/${objectType}/mass-delete`, { ids }, dispatch).then((data) => {
    if (data && !_.isEmpty(data.deleted_ids)) {
      dispatch(tryFetchDataByView(
        objectType,
        viewId,
        {
          ...params,
          page: getFetchPage(params, meta, ids.length),
        },
      ));
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
export const tryUpdateClients = (params, objectType, tableParams, viewId) => dispatch =>
  patch(`/admin/${objectType}/mass-update`, params, dispatch).then((data) => {
    if (data && !_.isEmpty(data.updated_ids)) {
      dispatch(tryFetchDataByView(objectType, viewId, tableParams));
    }
  });


//
export const setViews = views => ({
      type: SET_VIEWS,
      payload: { views },
    });

export const tryFetchViewsByType = objectType => dispatch =>
  get(`/admin/list_views/object/${objectType}`, {}, dispatch).then((data) => {
    if (data && data.data) {
      dispatch(setViews(data.data));
    }
  });


//
export const setActiveView = (viewId, objectType) => ({
  type: SET_ACTIVE_VIEW,
  payload: { viewId, objectType },
});
