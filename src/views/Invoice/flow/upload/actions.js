import {
  ADD_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SET_ATTACHMENTS,
} from './actionTypes';

export const setAttachments = data => ({
  type: SET_ATTACHMENTS,
  payload: { data },
});

export const addAttachment = data => ({
  type: ADD_ATTACHMENT,
  payload: { data },
});

export const removeAttachment = id => ({
  type: REMOVE_ATTACHMENT,
  payload: { id },
});
