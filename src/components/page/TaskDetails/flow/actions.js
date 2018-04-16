import { get, patch, post, httpDelete } from 'store/http/httpAction';
import {  
  SET_TASK_FIELD,
  SET_TASK_FIELDS,
  SET_TASK_ASSIGNEE,
  SET_TASK_ASSIGNEES,
  SET_TASK_RECENT_ASSIGNEES,
  ADD_NEW_SUBJECT,
  SET_TASK_SUBJECTS,
  REMOVE_MY_SUBJECT,
} from './actionTypes';

//
export const setTaskFields = data => ({
    type: SET_TASK_FIELDS,
    payload: { data },
  });

export const tryFetchTask = (id, objectType) => dispatch =>
    get(`/admin/tasks/${id}`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        dispatch(setTaskFields(data.data));
        // TODO: move out from this part for better performance
        dispatch(tryFetchAssignees(id, objectType));
        // TODO: move out from this part for better performance
        dispatch(tryFetchRecentAssignees(objectType));
        // TODO: move out from this part for better performance
        dispatch(tryFetchTaskSubjects());
      }
    });


//
export const setAssignees = assignees => ({
      type: SET_TASK_ASSIGNEES,
      payload: { assignees },
    });
export const tryFetchAssignees = (id, objectType) => dispatch =>
    get(`/admin/tasks/object/${objectType}/${id}/managers`, {}, dispatch).then((data) => {
      if (data) {
        dispatch(setAssignees(data.data));
      }
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


//
export const setRecentAssignees = recentAssignees => ({
      type: SET_TASK_RECENT_ASSIGNEES,
      payload: { recentAssignees },
    });

export const tryFetchRecentAssignees = objectType => dispatch =>
    get(`/admin/tasks/object/${objectType}/recent_managers`, {}, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        dispatch(setRecentAssignees(data.data));
      }
    });


//
export const setAssignee = assigneeId => ({
      type: SET_TASK_ASSIGNEE,
      payload: { assigneeId },
    });
//
export const setFieldValue = (field, value) => ({
      type: SET_TASK_FIELD,
      payload: { field, value },
    });


//  
export const trySaveNewTask = (id, type, taskData) => dispatch =>
    post(`/admin/tasks/`, { ...taskData }, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        console.log(data);
      }
    });


//
export const tryUpdateTask = (id, type, taskData) => dispatch =>
    patch(`/admin/tasks/${id}`, { ...taskData }, dispatch).then((data) => {
      if (data && !_.isEmpty(data.data)) {
        console.log(data);
      }
    });