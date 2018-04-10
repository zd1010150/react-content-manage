import { get, patch } from 'store/http/httpAction';
import {
  SET_TASK_FIELD,
  SET_TASK_FIELDS,
  SET_TASK_ASSIGNEE,
  SET_TASK_ASSIGNEES,
} from './actionTypes';

export const setTaskFields = data => ({
    type: SET_TASK_FIELDS,
    payload: { data },
  });

export const tryFetchTask = (id, objectType) => dispatch =>
    get(`/admin/tasks`, {}, dispatch).then((data) => {
      if (data) {
        dispatch(setTaskFields(data.data));
        dispatch(tryFetchAssignees(id, objectType));
      }
    });
//

export const tryFetchAssignees = (id, objectType) => dispatch =>
    get(`/admin/tasks/object/${objectType}/${id}/managers`, {}, dispatch).then((data) => {
      if (data) {
        dispatch(setAssignees(data.data));
      }
    });

export const setAssignees = assignees => ({
  type: SET_TASK_ASSIGNEES,
  payload: { assignees },
}); 


export const tryFetchRecentManager = (id, objectType) => dispatch =>
    get(`/admin/tasks/object/${objectType}/recent_managers`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        console.log(' fetch suc ');
        dispatch(setAssignTo(data.data));
      }
    });

export const setAssignTo = assignee => ({
  type: SET_TASK_ASSIGNEE,
  payload: { assignee },
});


export const setFieldValue = (field, value) => ({
  type: SET_TASK_FIELD,
  payload: { field, value },
});