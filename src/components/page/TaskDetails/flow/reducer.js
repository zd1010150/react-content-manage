import {
  SET_TASK_ASSIGNEE,
  SET_TASK_ASSIGNEES,
  SET_TASK_FIELD,
  SET_TASK_FIELDS,
  ADD_NEW_SUBJECT,
  SET_TASK_SUBJECTS,
  REMOVE_MY_SUBJECT,
} from './actionTypes';

const initialState = {
  assignees: [],
  assignTo: '',
  status: '',
  subject: '',
  priority: '',
  dueDate: '',
  comments: '',
  globalSubjects: [],
  mySubjects: [],
};

const taskDetails = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_SUBJECT:
      const { newSubject } = action.payload;
      return {
        ...state,
        mySubjects: [ ...state.mySubjects, newSubject ],
      };

    
    case SET_TASK_SUBJECTS:
      const { globalSubjects, mySubjects } = action.payload;
      debugger;
      return {
        ...state,
        globalSubjects,
        mySubjects,
      };

    
    case REMOVE_MY_SUBJECT:
      const { mySubjectId } = action.payload;
      return {
        ...state,
        mySubjects: state.mySubjects.filter(subject => subject.id !== mySubjectId),
      }

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