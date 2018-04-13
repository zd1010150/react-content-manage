import { get } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { SET_DUPLICATES, SET_FIELDS, SET_ROW_SELECTION } from './actionTypes';

export const setDuplicates = (leads, accounts) => ({
      type: SET_DUPLICATES,
      payload: { leads, accounts },
    });

export const tryFindDuplicates = params => dispatch =>
    get(`/admin/leads/duplicates/search?${params}`, {}, dispatch).then((data) => {
      if (data
          && (!_.isEmpty(data.leads) || !_.isEmpty(data.accounts))) {
        dispatch(setDuplicates(data.leads.data, data.accounts.data));
      }
    });


//
export const setRowSelection = selectedRowKeys => ({
      type: SET_ROW_SELECTION,
      payload: { selectedRowKeys },
    });


// Fetch five-field values of a specific lead for the find duplicate page
export const setFields = data => ({
      type: SET_FIELDS,
      payload: { data },
    });

export const tryFetchClientDetails = id => dispatch =>
    get(`/admin/leads/${id}`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        dispatch(setFields(data.data));
      }
    });