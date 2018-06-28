import { SET_ATTACHMENT, REMOVE_ATTACHMENT } from './actionTypes';

export const setAttachment = newFile => ({
  type: SET_ATTACHMENT,
  payload: { newFile },
});


export const removeAttachment = existFile => ({
  type: REMOVE_ATTACHMENT,
  payload: { existFile },
});
