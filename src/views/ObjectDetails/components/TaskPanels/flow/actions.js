import { get } from 'store/http/httpAction';
import { SET_TASK_DATA, SET_MODULES } from './actionTypes';

export const setModules = modules => ({
  type: SET_MODULES,
  payload: { modules },
});

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
