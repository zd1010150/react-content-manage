import { get } from 'store/http/httpAction';
import { RESET, SET_DETAILS, SET_SIMILAR_DATA } from './actionTypes';


// Fetch similar data by user name
export const setSimilarData = similarData => ({
  type: SET_SIMILAR_DATA,
  payload: { similarData },
});

export const tryFetchSimilarData = fullName => dispatch =>
  get(`/admin/accounts/similar?name=${fullName}`, {}, dispatch).then((data) => {
    if (data && data.data) {
      dispatch(setSimilarData(data.data));
    }
  });


// Fetch owner info by object id
export const setDetails = details => ({
  type: SET_DETAILS,
  payload: { details },
});

export const tryFetchOwner = objectId => dispatch =>
  get(`/admin/leads/${objectId}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(setDetails(data.data));
      dispatch(tryFetchSimilarData(data.data.name));
    }
  });
