import { toTimezone } from 'utils/dateTimeUtils';
import moment from 'moment';
import {
  ADD_NEW_SUBJECT,
  SET_TASK_SUCCESS,
  REMOVE_MY_SUBJECT,
  SET_TASK_ASSIGNEE,
  SET_TASK_ASSIGNEES,
  SET_TASK_FIELD,
  SET_TASK_FIELDS,
  SET_TASK_RECENT_ASSIGNEES,
  SET_TASK_SUBJECTS,
  RESET_TASK,
  SET_DEFAULT_STATE,
} from './actionTypes';

const initialState = {
  globalSubjects: [],
  mySubjects: [],
  assignees: [],
  assigneeId: '',
  comments: '',
  dueTime: moment().format('YYYY-MM-DD'),
  priorityCode: '',
  recentAssignees: [],
  statusCode: '',
  subject: '',
  synced: false,
};

const mapResponseToStore = ({
  id,
  assigner,
  subject,
  status_code,
  priority_code,
  due_date,
  comments,
}) => ({
  assigneeId: assigner.id,
  comments,
  dueTime: toTimezone(due_date, '+1100', 'YYYY-MM-DD'),
  id,
  priorityCode: priority_code,
  statusCode: status_code,
  subject,
});

const taskDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_FIELDS:
      const { data } = action.payload;
      const mappedData = mapResponseToStore(data);
      return {
        ...state,
        ...mappedData,
      };


    case SET_TASK_SUBJECTS:
      const { globalSubjects, mySubjects } = action.payload;
      return {
        ...state,
        globalSubjects,
        mySubjects,
      };


    case ADD_NEW_SUBJECT:
      const { newSubject } = action.payload;
      return {
        ...state,
        mySubjects: [ ...state.mySubjects, newSubject ],
      };

    
    case REMOVE_MY_SUBJECT:
      const { mySubjectId } = action.payload;
      return {
        ...state,
        mySubjects: state.mySubjects.filter(subject => subject.id !== mySubjectId),
      }

    case SET_TASK_ASSIGNEE:
      const { assigneeId } = action.payload;      
      const isInRecent = !!state.recentAssignees.find(assignee => assignee.id == assigneeId);
      if (isInRecent) {
        return {
          ...state,
          assigneeId,
        };
      }
      const targetAssignee = state.assignees.find(assignee => assignee.id == assigneeId);
      return {
        ...state,
        assigneeId,
        recentAssignees: [ targetAssignee, ...state.recentAssignees ],
      };


    case SET_TASK_ASSIGNEES:
      const { assignees } = action.payload;      
      return {
        ...state,
        assignees,
      };


    case SET_TASK_FIELD:      
      const { field, value } = action.payload;
      console.log(field);
      return {
        ...state,
        [field]: value,
      };

    
    case SET_TASK_RECENT_ASSIGNEES:
      const { recentAssignees } = action.payload;
      return {
        ...state,
        recentAssignees,
      };

    
    case SET_TASK_SUCCESS:
      return {
        ...state,
        synced: true,
      };

    
    case RESET_TASK:
      return {
        ...state,
        assigneeId: '',
        comments: '',
        dueTime: moment().format('YYYY-MM-DD'),
        priorityCode: '',
        statusCode: '',
        subject: '',
        synced: false,
      };


    default:
      return state;
  }
};

export default taskDetails;
