import { get } from 'store/http/httpAction';
import { RESET, SET_STATUSES, SET_DETAILS, SET_SIMILAR_DATA, SET_OWNERS, SET_FIELD_VALUE } from './actionTypes';


// Fetch similar data by user name
export const setSimilarData = similarAccounts => ({
    type: SET_SIMILAR_DATA,
    payload: { similarAccounts },
  });

export const tryFetchSimilarData = fullName => dispatch =>
  get(`/admin/accounts/similar?name=${fullName}`, {}, dispatch).then((data) => {
    if (data && data.data) {
      dispatch(setSimilarData(data.data));
    }
  });


// Fetch owners by meta id
export const setOwners = owners => ({
    type: SET_OWNERS,
    payload: { owners },
  });

export const tryFetchOwners = metaDataId => dispatch =>
  get(`/admin/objects/lookup-metadata/${metaDataId}`, {}, dispatch).then((data) => {
    if (data) {
      dispatch(setOwners(data));
    }
  });


// Fetch owners by meta id
export const setStatuses = accountStatuses => ({
    type: SET_STATUSES,
    payload: { accountStatuses },
  });

export const tryFetchStatuses = () => dispatch =>
  get('/admin/metadata/object/accounts/name/account_status', {}, dispatch).then((data) => {
    if (data && data.data && data.data.picklists) {
      dispatch(setStatuses(data.data.picklists));
    }
  });


// Fetch owner info by object id
export const setDetails = details => ({
    type: SET_DETAILS,
    payload: { details },
  });

export const tryFetchOwner = objectId => dispatch =>
  get(`/admin/leads/${objectId}`, {}, dispatch).then((data) => {
    if (data
        && !_.isEmpty(data.data)
        && !_.isEmpty(data.data.ownership_id)) {
      dispatch(setDetails(data.data));
      // fetch similar data
      dispatch(tryFetchSimilarData(data.data.name));
      // fetch owners
      dispatch(tryFetchOwners(data.data.ownership_id.meta_id));
      // fetch account status (hard coded)
      dispatch(tryFetchStatuses());
    }
  });


export const setFieldValue = (name, value, extraValue) => ({
  type: SET_FIELD_VALUE,
  payload: { name, value, extraValue },
});
