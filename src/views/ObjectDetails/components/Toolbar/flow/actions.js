import { httpDelete } from 'store/http/httpAction';
import { SET_TOOLS, DELETE_SUCCESS } from './actionTypes';

export const setTools = tools => ({
  type: SET_TOOLS,
  payload: { tools },
});

//
const deleteSuccess = () => ({
  type: DELETE_SUCCESS,
});

export const tryDeleteEntity = (objectType, objectId) => dispatch =>
  httpDelete(`/admin/${objectType}/${objectId}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      console.log('delete success');
      dispatch(deleteSuccess());
    }
  });
