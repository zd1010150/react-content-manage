import { get } from 'store/http/httpAction';
import { SET_TASK_DATA } from './actionTypes';

export const setTaskData = (taskType, data) => ({
  type: SET_TASK_DATA,
  payload: { taskType, data },
});

export const tryFetchTaskByModule = (id, module) => dispatch =>
    get(`https://jsonplaceholder.typicode.com/posts/${id}`, {}, dispatch).then((data) => {
      if (data) {
        dispatch(setTaskData());
      }
    });