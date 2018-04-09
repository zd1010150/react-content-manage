import { SET_TASK_FIELD, SET_TASK_FIELDS, SET_TASK_ASSIGNEE } from './actionTypes';

const initialState = {
  assignees: [],
  assignTo: '',
  status: '',
  subject: '',
  priority: '',
  dueDate: '',
  comments: '',
};

const taskDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_ASSIGNEE:
      const { assignee } = action.payload;
      return {
        ...state,
        assignTo: assignee,
      };


    case SET_TASK_FIELDS:
      const { data } = action.payload;
      const {
        assignTo,
        status,
        subject,
        priority,
        dueDate,
        comments,
      } = data;

      return {
        ...state,
        assignTo,
        status,
        subject,
        priority,
        dueDate,
        comments,
      };


    case SET_TASK_FIELD:
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };


    default:
      return state;
  }
};

export default taskDetails;