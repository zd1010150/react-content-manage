import { httpDelete } from 'store/http/httpAction';
import { SET_TOOLS } from './actionTypes';

export const setTools = _ => ({
  type: SET_TOOLS,
  payload: { tools: ['convert', 'delete', 'sharing', 'findDuplicates'] },
});

export const tryDelete = (id, objectType) => dispatch => httpDelete(`/admin/${objectType}/${id}`, {}, dispatch).then((data) => {
  if (data && !_.isEmpty(data.data)) {
    console.log('delete success');
    // dispatch(deleteSuccess());
  }
});