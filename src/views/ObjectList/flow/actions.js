import { get, patch, httpDelete } from 'store/http/httpAction';
import { SET_DATA, SET_ROW_SELECTION } from './actionTypes';

const concatParams = params => {
  if (_.isEmpty(params)) return '';

  let str = '?';
  _.forOwn(params, (value, key) => {
    str += `${key}=${value}&`;
  });
  return str;
};

export const setData = (columns, data, meta) => ({
      type: SET_DATA,
      payload: { columns, data, meta },
    });

export const tryFetchData = (objectType, params) => dispatch =>
    get(`/admin/${objectType}${concatParams(params)}`, {}, dispatch).then((data) => {
      if (data
          && !_.isEmpty(data.index)
          && data.index.data
          && data.index.meta
          && !_.isEmpty(data.selector_meta)
          && data.selector_meta.data) {
        dispatch(setData(data.selector_meta.data, data.index.data, data.index.meta));
      }
    });
    
//
export const setRowSelection = selectedRowKeys => ({
      type: SET_ROW_SELECTION,
      payload: { selectedRowKeys },
    });


//
export const deleteClient = deletedId => ({
      type: DELETE_CLIENT,
      payload: { deletedId },
    });

export const tryDeleteClientByType = (objectType, id) => dispatch =>
    httpDelete(`/admin/${objectType}/${id}`, {}, dispatch).then((data) => {
      debugger;
      if (data && data.deleted) {
        dispatch(deleteClient(id));
      }
    });