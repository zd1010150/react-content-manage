import { toTimezone } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
const { PhantomId } = Enums;
import {
  SET_TASK_FIELDS,

  SET_TASK_ASSIGNEE,
  SET_TASK_ASSIGNEES,
  SET_TASK_RECENT_ASSIGNEES,
  SET_TASK_FIELD,  
  ADD_NEW_SUBJECT,
  SET_TASK_SUBJECTS,
  REMOVE_MY_SUBJECT,
} from './actionTypes';

const initialState = {
  globalSubjects: [],
  mySubjects: [],

  assignees: [],
  assigneeId: PhantomId,
  comments: '',
  dueTime: '',
  priorityCode: PhantomId,
  recentAssignees: [],
  statusCode: PhantomId,
  subject: '',
};

const mapResponseToStore = ({
  id,
  assign_to_user_id,
  taskable_type,
  subject,
  status_code,
  priority_code,
  due_datetime,
  ...others,
}) => {
  
  return {
    assigneeId: assign_to_user_id,
    comments: '',
    dueTime: toTimezone(due_datetime, '+1100', 'YYYY-MM-DD HH:mm:ss'),
    id,
    priorityCode: priority_code,
    statusCode: status_code,
    subject,
  };
}

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


    default:
      return state;
  }
};

export default taskDetails;