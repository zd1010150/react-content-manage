import { get, patch } from 'store/http/httpAction';
import { SET_TASK_FIELD, SET_TASK_FIELDS, SET_TASK_ASSIGNEE } from './actionTypes';

export const setTaskFields = data => ({
  type: SET_TASK_FIELDS,
  payload: { data },
});

export const tryFetchTask = (id, objectType) => dispatch =>
    get(`/admin/${objectType}/${id}`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        console.log(' fetch suc ');
        dispatch(setTaskFields(data.data));
      }
    });


export const setAssignTo = assignee => ({
  type: SET_TASK_ASSIGNEE,
  payload: { assignee },
});

export const tryFetchRecentManager = (id, objectType) => dispatch =>
    get(`/admin/tasks/object/${objectType}/recent_managers`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        console.log(' fetch suc ');
        dispatch(setAssignTo(data.data));
      }
    });


export const setFieldValue = (field, value) => ({
  type: SET_TASK_FIELD,
  payload: { field, value },
});