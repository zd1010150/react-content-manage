import { get, patch, post, httpDelete } from 'store/http/httpAction';
import {  
  SET_TASK_FIELD,
  SET_TASK_FIELDS,
  SET_TASK_ASSIGNEE,
  SET_TASK_ASSIGNEES,
  ADD_NEW_SUBJECT,
  SET_TASK_SUBJECTS,
  REMOVE_MY_SUBJECT,
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
        dispatch(tryFetchTaskSubjects());
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


//
export const setTaskSubjects = (globalSubjects, mySubjects) => ({
      type: SET_TASK_SUBJECTS,
      payload: { globalSubjects, mySubjects },
    });

export const tryFetchTaskSubjects = $ => dispatch =>
    get('/admin/tasks/subject/me', {}, dispatch).then((data) => {
      if (data
          && (!_.isEmpty(data.global)
          || !_.isEmpty(data.me))) {
        dispatch(setTaskSubjects(data.global, data.me));
      }
    });


//
export const addNewSubject = newSubject => ({
      type: ADD_NEW_SUBJECT,
      payload: { newSubject },
    });

export const trySaveNewSubject = name => dispatch =>
    post(`/admin/tasks/subject/me?name=${name}`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        dispatch(addNewSubject(data.data));
      }
    });


//
export const removeMySubject = mySubjectId => ({
      type: REMOVE_MY_SUBJECT,
      payload: { mySubjectId },
    });

export const tryDeleteSubject = id => dispatch =>
    httpDelete(`/admin/tasks/subject/me/${id}`, {}, dispatch).then((data) => {
      if (data) {
        dispatch(removeMySubject(id));
      }
    });


