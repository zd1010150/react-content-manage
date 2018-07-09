import { get, patch } from 'store/http/httpAction';
import { SET_ATTACHMENT_INFO, SET_FIELD_VALUE, RESET } from './actionTypes';

const setAttachmentInfo = data => ({
  type: SET_ATTACHMENT_INFO,
  payload: { data },
});

export const tryFetchAttachmentInfo = attachmentId => (dispatch) => {
  return get(`/admin/files/${attachmentId}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      dispatch(setAttachmentInfo(data.data));
    }
  });
};


export const tryUpdateAttachmentInfo = (attachmentId, categoryId, comment, component) => (dispatch) => {
  const params = `category=${categoryId}&comment=${comment}`;
  return patch(`/admin/files/${attachmentId}?${params}`, {}, dispatch).then((data) => {
    if (data && !_.isEmpty(data.data)) {
      // TODO: enable the following if need to stay on this page when update successfully
      // dispatch(setAttachmentInfo(data.data));
      // TODO: temp solution, not a best practice
      component.props.history.goBack();
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
