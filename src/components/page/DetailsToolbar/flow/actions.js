import { httpDelete } from 'store/http/httpAction';
import { SET_TOOLS, DELETE_SUCCESS, RESET } from './actionTypes';

export const setTools = tools => ({
  type: SET_TOOLS,
  payload: { tools },
});


export const deleteSuccess = () => ({
  type: DELETE_SUCCESS,
});

export const tryDeleteEntity = (objectId, objectType) => dispatch =>
  httpDelete(`/admin/${objectType}/${objectId}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      dispatch(deleteSuccess());
    }
  });


export const reset = () => ({
  type: RESET,
});
