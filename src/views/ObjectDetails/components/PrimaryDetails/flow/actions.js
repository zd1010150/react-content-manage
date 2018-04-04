import { get } from 'store/http/httpAction';
import { SET_DATA_SOURCE, SET_ACTIVE_FIELD, RESET_ACTIVE_FIELD } from './actionTypes';
import Enums from 'utils/EnumsManager';


const getFetchUrl = (id, type) => {
  if (_.isEmpty(id) || id === Enums.PhantomID) {
    return `/admin/${type}/create`;
  }
  return `/admin/${type}/${id}/page_layout`;
};

export const setSource = dataSource => ({
  type: SET_DATA_SOURCE,
  payload: { dataSource },
});

export const tryFetch = (id, type) => dispatch => get(getFetchUrl(id, type), {}, dispatch).then((data) => {
  if (data
      && !_.isEmpty(data.data)
      && !_.isEmpty(data.data.structure)) {
    dispatch(setSource(data.data.structure));
  }
});


export const setActiveField = (code, fieldId) => ({
  type: SET_ACTIVE_FIELD,
  payload: { code, fieldId },
});


export const resetActiveField = $ => ({
  type: RESET_ACTIVE_FIELD,
});