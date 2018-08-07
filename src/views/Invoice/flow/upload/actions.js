import { httpDelete } from 'store/http/httpAction';
import {
  ADD_ATTACHMENT,
  REMOVE_ATTACHMENT,
} from './actionTypes';

export const addAttachment = data => ({
  type: ADD_ATTACHMENT,
  payload: { data },
});

export const removeAttachment = id => ({
  type: REMOVE_ATTACHMENT,
  payload: { id },
});

export const tryDeleteFile = id => dispatch =>
  httpDelete(`/admin/files/${id}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      dispatch(removeAttachment(id));
    }
  });
