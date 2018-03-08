import { SET_TABLE_DATA, DELETE_SUCCESS } from './actionTypes';
import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';

const url = '/admin/leads';

const setTableData = json => ({  
  type: SET_TABLE_DATA,
  payload: json,
});

export const fetchByParams = (
  page = 1,
  per_page = Enums.DefaultPageConfigs.PageSize,
  orderBy = '',
  sortedBy = '',
) => dispatch => get(url, {
  page,
  per_page,
  orderBy,
  sortedBy
}, dispatch).then(json => {
              console.log(`fetching -> page:${page}, per_page:${per_page}, orderBy:${orderBy}, sortedBy:${sortedBy}`);
              if (json && (!_.isEmpty(json.index))) {
                debugger;
                dispatch(setTableData(json))
              }
            });


const syncDeletion = id => ({
  type: DELETE_SUCCESS,
  payload: { id },
});

export const deleteLead = id => 
  dispatch => get(url, {}, dispatch)
    // => delete(`${url}/${id}`, {}, dispatch)
    .then(json => {
      if (json) {
        dispatch(syncDeletion(id))
      }
    });