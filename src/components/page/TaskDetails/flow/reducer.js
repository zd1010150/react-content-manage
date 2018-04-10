import {
  SET_TASK_ASSIGNEE,
  SET_TASK_ASSIGNEES,
  SET_TASK_FIELD,
  SET_TASK_FIELDS,
} from './actionTypes';

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


    case SET_TASK_ASSIGNEES:
      const { assignees } = action.payload;      
      return {
        ...state,
        // TODO: remove default value for assignees
        assignees: [{ id: 1, fullName: 'xyz', team: 'abc' }, { id: 2, fullName: 'xyz2', team: 'edf'}],
      };


    case SET_TASK_FIELD:
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };


    case SET_TASK_FIELDS:
      const { data } = action.payload;
      // TODO: remove the default values for data
      const {
        assignTo = 'xyz',
        status = 'new',
        subject = 'pending email',
        priority = 'high',
        dueDate = '1900-12-30',
        comments = 'test',
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


    default:
      return state;
  }
};

export default taskDetails;