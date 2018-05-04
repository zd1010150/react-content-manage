import { get } from 'store/http/httpAction';
import { RESET, SET_DUPLICATES, SET_FIELD, SET_FIELDS, SET_ROW_SELECTION, TOGGLE_CHECKBOX } from './actionTypes';

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

export const tryFetchClientDetails = (id, objectType) => dispatch =>
    get(`/admin/leads/${id}/duplication_search_key_values`, {}, dispatch).then((data) => {
      if (!_.isEmpty(data)) {
        dispatch(setFields(data));
      }
    });


//
export const toggleCheckbox = (checkedKey, checked) => ({
      type: TOGGLE_CHECKBOX,
      payload: { checkedKey, checked },
    });

//
export const setFieldValue = (fieldKey, value) => ({
      type: SET_FIELD,
      payload: { fieldKey, value },
    });


//
export const reset = $ => ({ type: RESET });