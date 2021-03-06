/* eslint arrow-parens: ["error", "as-needed"] */
import { get, post } from 'store/http/httpAction';
import { SET_EMAIL, SET_SUCCESS, RESET, SET_TYPES } from './actionTypes';
import { findLead, formatPayload } from './utils';

const setEmail = email => ({
  type: SET_EMAIL,
  payload: { email },
});

export const tryFetchLeadIfNeeded = objectId => (dispatch, getState) => {
  const lead = findLead(objectId, getState());
  if (lead) {
    return dispatch(setEmail(lead.email));
  }
  return get(`/admin/leads/${objectId}`, {}, dispatch).then(data => {
    if (data && !_.isEmpty(data.data) && data.data.email) {
      dispatch(setEmail(data.data.email));
    }
  });
};


export const setSuccess = newAccountId => ({
  type: SET_SUCCESS,
  payload: { newAccountId },
});

export const tryConvertLead = (objectId, payload) => dispatch =>
  post(`/admin/leads/${objectId}/convert`, formatPayload(payload), dispatch).then(data => {
    if (data && data.status === 'SUCCESS' && data.account.id) {
      dispatch(setSuccess(data.account.id));
    }
  });


export const reset = () => ({
  type: RESET,
});


export const setTypes = types => ({
  type: SET_TYPES,
  payload: { types },
});

export const tryFetchTypes = () => dispatch =>
  get('/admin/metadata/object/opportunities/name/type', {}, dispatch).then(data => {
    if (data
        && !_.isEmpty(data.data)
        && !_.isEmpty(data.data.picklists)) {
      dispatch(setTypes(data.data.picklists));
    }
  });