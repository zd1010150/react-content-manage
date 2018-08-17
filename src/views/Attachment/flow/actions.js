import { get, patch } from 'store/http/httpAction';
import { SET_ATTACHMENT_INFO, SET_FIELD_VALUE, RESET } from './actionTypes';

const setAttachmentInfo = data => ({
  type: SET_ATTACHMENT_INFO,
  payload: { data },
});

export const tryFetchAttachmentInfo = attachmentId => dispatch =>
  get(`/admin/files/${attachmentId}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(setAttachmentInfo(data.data));
    }
  });

export const tryUpdateAttachmentInfo = (attachmentId, categoryId, comment) => (dispatch) => {
  const params = `category=${categoryId}&comment=${comment}`;
  return patch(`/admin/files/${attachmentId}?${params}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      console.log('update attachment 200');
      console.table(data.data);
    }
  });
};

export const setFieldValue = (key, value) => ({
  type: SET_FIELD_VALUE,
  payload: { key, value },
});

export const reset = () => ({
  type: RESET,
});
