import { get } from 'store/http/httpAction';
import {
  SET_RELATED_TO,
  SET_RELATED_TOS,
  SET_STATUS,
  SET_DESCRIPTION,
} from './actionTypes';

export const setRelatedTo = id => ({
  type: SET_RELATED_TO,
  payload: { id },
});

export const setRelatedTos = data => ({
  type: SET_RELATED_TOS,
  payload: { data },
});

export const tryFetchRelatedTos = (type, id) => dispatch =>
  get(`/admin/invoice/related-object-options/${type}/${id}`, {}, dispatch).then((data) => {
    if (data && _.isArray(data.data)) {
      dispatch(setRelatedTos(data.data));
    }
  });

export const setStatus = id => ({
  type: SET_STATUS,
  payload: { id },
});

export const setDescription = description => ({
  type: SET_DESCRIPTION,
  payload: { description },
});
