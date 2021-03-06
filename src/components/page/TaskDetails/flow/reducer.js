import { toTimezone } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
import { formatRelatedTos } from './utils';
import { ADD_NEW_SUBJECT, REMOVE_MY_SUBJECT, RESET_TASK, SET_TASK_ASSIGNEE, SET_TASK_ASSIGNEES, SET_TASK_FIELD, SET_TASK_FIELDS, SET_TASK_RECENT_ASSIGNEES, SET_TASK_SUBJECTS, SET_TASK_SUCCESS, SET_ROUTE_INFO, SET_RELATED_TOS, SET_RELATED_TO } from './actionTypes';

const {
  Leads,
  Accounts,
  Opportunities,
} = Enums.ObjectTypes;

const initialState = {
  relatedLeads: [],
  relatedAccounts: [],
  relatedOpportunities: [],
  globalSubjects: [],
  mySubjects: [],
  assignees: [],
  relatedTo: '',
  assigneeId: '',
  comments: '',
  dueTime: null,
  // default priority is 'Normal'
  priorityCode: 1,
  recentAssignees: [],
  // default status is 'Not Started'
  statusCode: 0,
  subject: '',
  synced: '',
  routeInfo: '',
  resetTask: false,
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
  assigner,
  assigneeId: assigner.id,
  comments,
  dueTime: toTimezone(due_date),
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
        mySubjects: [...state.mySubjects, newSubject],
      };


    case REMOVE_MY_SUBJECT:
      const { mySubjectId } = action.payload;
      return {
        ...state,
        mySubjects: state.mySubjects.filter(subject => subject.id !== mySubjectId),
      };

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
        recentAssignees: [targetAssignee, ...state.recentAssignees],
      };


    case SET_TASK_ASSIGNEES:
      return {
        ...state,
        assignees: action.payload.assignees,
      };


    case SET_TASK_FIELD:
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      };


    case SET_TASK_RECENT_ASSIGNEES:
      const { recentAssignees } = action.payload;
      const currentAssignee = recentAssignees.find(ra => ra.id === state.assigneeId);
      if (!currentAssignee && !_.isEmpty(state.assigner)) {
        return {
          ...state,
          recentAssignees: [state.assigner, ...state.recentAssignees],
        };
      }
      return {
        ...state,
        recentAssignees,
      };


    case SET_TASK_SUCCESS:
      const { synced } = action.payload;
      return {
        ...state,
        synced,
      };

    case SET_ROUTE_INFO:
      const { info } = action.payload;
      return {
        ...state,
        routeInfo: info,
      };

    case RESET_TASK:
      return {
        ...initialState,
        globalSubjects: state.globalSubjects,
        mySubjects: state.mySubjects,
        assignees: state.assignees,
        recentAssignees: state.recentAssignees,
        relatedLeads: state.relatedLeads,
        relatedAccounts: state.relatedAccounts,
        relatedOpportunities: state.relatedOpportunities,
        relatedTo: state.relatedTo,
      };

    case SET_RELATED_TOS:
      return {
        ...state,
        relatedLeads: formatRelatedTos(action.payload.data, Leads),
        relatedAccounts: formatRelatedTos(action.payload.data, Accounts),
        relatedOpportunities: formatRelatedTos(action.payload.data, Opportunities),
      };

    case SET_RELATED_TO:
      return {
        ...state,
        relatedTo: action.payload.id,
      };


    default:
      return state;
  }
};

export default taskDetails;
