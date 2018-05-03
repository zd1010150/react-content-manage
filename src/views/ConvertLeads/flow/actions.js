/* eslint arrow-parens: ["error", "as-needed"] */
import { get, post } from 'store/http/httpAction';
import { SET_EMAIL, SET_SUCCESS } from './actionTypes';
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


export const setSuccess = () => ({
  type: SET_SUCCESS,
});

export const tryConvertLead = (objectId, payload) => dispatch =>
  post(`/admin/leads/${objectId}/convert`, formatPayload(payload), dispatch).then(data => {
    if (data) {
      debugger;
      dispatch(setSuccess());
    }
  });
