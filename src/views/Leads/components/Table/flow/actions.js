import { get, httpDelete, post } from 'store/http/httpAction';
import { getUrlByViewId } from 'utils/common';
import Enums from 'utils/EnumsManager';

import { SET_TABLE_DATA } from './actionTypes';
const url = '/admin/leads';

export const setTableData = (json, sorter) => ({  
  type: SET_TABLE_DATA,
  payload: {
    json,
    sorter,
  }
});

export const fetchByParams = (
  page = 1,
  per_page = Enums.DefaultPageConfigs.PageSize,
  orderBy = '',
  sortedBy = '',
  activeId = Enums.PhantomID,
) => dispatch => get(getUrlByViewId(activeId, 'leads'), { page, per_page, orderBy, sortedBy }, dispatch).then(json => {
  console.log(`fetching -> page:${page}, per_page:${per_page}, orderBy:${orderBy}, sortedBy:${sortedBy}, activeId:${activeId}`);
  if (json && (!_.isEmpty(json.index))) {
    dispatch(setTableData(json, {
      orderBy,
      sortedBy,
    }));
  }
});


/**
 *  Delete and mass delete
 */
export const deleteLead = (id, refetchParams) => 
  dispatch => httpDelete(`${url}/${id}`, {}, dispatch)
    .then(json => {
      if (json.deleted) {
        const { current, pageSize, orderBy, sortedBy } = refetchParams;
        dispatch(fetchByParams(current, pageSize, orderBy, sortedBy));
      }
    });

export const massDelete = (ids, refetchParams) => 
  dispatch => httpDelete(`${url}/mass-delete`, { ids }, dispatch)
    .then(json => {
      if (json) {
        const { current, pageSize, orderBy, sortedBy } = refetchParams;
        dispatch(fetchByParams(current, pageSize, orderBy, sortedBy));
      }
    });

/**
 *  Mass update
 */
export const massUpdate = (ids, field_name, value, refetchParams) => 
    dispatch => post(`${url}/mass-update`, { ids, field_name, value }, dispatch)
      .then(json => {
        if (json.updated_ids.length > 0) {
          const { current, pageSize, orderBy, sortedBy } = refetchParams;
          dispatch(fetchByParams(current, pageSize, orderBy, sortedBy));
        }
      });